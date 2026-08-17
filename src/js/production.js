const PRODUCTS_PER_PAGE = 9;

let allProducts = [];
let filteredProducts = [];
let currentPage = 1;

// State hiện tại của form (chỉ cập nhật khi nhấn "Xem kết quả")
let currentFilters = {
    brand: "Tất cả",
    genders: [],
    sort: ""
};

// State tạm thời trên UI (người dùng đang chọn nhưng chưa áp dụng)
let tempFilters = {
    brand: "Tất cả",
    genders: [],
    sort: ""
};

// Lấy dữ liệu từ file JSON
async function fetchProducts() {
    try {
        const response = await fetch("/products.json");
        if (!response.ok) {
            throw new Error("Không thể tải dữ liệu sản phẩm.");
        }
        const data = await response.json();
        return Array.isArray(data) ? data : (data.products || []);
    } catch (error) {
        console.error("Lỗi fetchProducts:", error);
        return [];
    }
}

// Đọc giá trị từ form (lấy những gì người dùng đang chọn trên UI)
function readFormValues() {
    const brandButtons = document.querySelectorAll(".listBox .searchBtn button");
    const genderCheckboxes = document.querySelectorAll('.genderChoice input[name="gender"]');
    const sortRadios = document.querySelectorAll('.priceSelector input[name="price"]');
    
    // Đọc thương hiệu từ nút active
    const activeBrand = Array.from(brandButtons).find(btn => btn.classList.contains("active"));
    tempFilters.brand = activeBrand ? activeBrand.textContent.trim() : "Tất cả";
    
    // Đọc giới tính từ checkbox
    tempFilters.genders = Array.from(genderCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.id === "male" ? "Nam" : "Nữ");
    
    // Đọc sắp xếp từ radio
    const activeSort = Array.from(sortRadios).find(radio => radio.checked);
    tempFilters.sort = activeSort ? activeSort.id : "";
}

// Áp dụng bộ lọc (chỉ gọi khi nhấn "Xem kết quả")
function applyFilter() {
    // Đọc giá trị từ form
    readFormValues();
    
    // Cập nhật state hiện tại
    currentFilters = {
        brand: tempFilters.brand,
        genders: [...tempFilters.genders],
        sort: tempFilters.sort
    };
    
    console.log("Áp dụng bộ lọc:", currentFilters);
    
    // Lọc sản phẩm
    filteredProducts = allProducts.filter(product => {
        // Lọc theo thương hiệu
        const matchBrand = (currentFilters.brand === "Tất cả") || 
                           (product.brand && product.brand.toLowerCase() === currentFilters.brand.toLowerCase());
        
        // Lọc theo giới tính
        const matchGender = (currentFilters.genders.length === 0) || 
                            (product.gender && currentFilters.genders.includes(product.gender));
        
        return matchBrand && matchGender;
    });
    
    // Sắp xếp
    if (currentFilters.sort === "lowToHigh") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (currentFilters.sort === "highToLow") {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (currentFilters.sort === "new") {
        filteredProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (currentFilters.sort === "onSale") {
        filteredProducts.sort((a, b) => (b.sold || 0) - (a.sold || 0));
    }
    
    // Về trang 1 và render
    goToPage(1);
}

// Format giá tiền
function formatPrice(price) {
    return (price || 0).toLocaleString("vi-VN") + " VNĐ";
}

// Tạo card sản phẩm
function createProductCard(product) {
    const boxContent = document.createElement("div");
    boxContent.className = "boxContent";

    boxContent.innerHTML = `
        <div class="boxContent_image" style="background-image: url('${product.image?.thumbnail || ''}')"></div>
        <h3>${product.name || 'Sản phẩm'}</h3>
        <p>Lifestyle</p>
        <p><b>${formatPrice(product.price)}</b></p>
        <div class="boxContent_buy">
            <button class="shopCart"><i class="fa-sharp-duotone fa-cart-shopping"></i></button>
            <button class="btnBuy" data-product-id="${product.id}">Xem chi tiết</button>
        </div>
    `;

    boxContent.querySelector(".btnBuy").addEventListener("click", () => {
        window.location.href = `/productionDetail.html?id=${encodeURIComponent(product.id)}`;
    });

    return boxContent;
}

// Render sản phẩm
function renderProducts(productsOfPage) {
    const boxWrapper = document.querySelector(".boxWrapper");
    if (!boxWrapper) return;
    boxWrapper.innerHTML = "";

    const fragment = document.createDocumentFragment();
    productsOfPage.forEach((product) => {
        fragment.appendChild(createProductCard(product));
    });
    boxWrapper.appendChild(fragment);
}

// Lấy sản phẩm theo trang
function getProductsOfPage(products, page) {
    const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
    return products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
}

// Tính tổng số trang
function getTotalPages(products) {
    return Math.max(1, Math.ceil(products.length / PRODUCTS_PER_PAGE));
}

// Tạo danh sách số trang
function getPageNumberList(totalPages, currentPage) {
    const delta = 1;
    const pageNumbers = [];
    for (let page = 1; page <= totalPages; page++) {
        const isEdgePage = page === 1 || page === totalPages;
        const isNearCurrentPage = page >= currentPage - delta && page <= currentPage + delta;

        if (isEdgePage || isNearCurrentPage) {
            pageNumbers.push(page);
        } else if (pageNumbers[pageNumbers.length - 1] !== "...") {
            pageNumbers.push("...");
        }
    }
    return pageNumbers;
}

// Render phân trang
function renderPagination(totalPages, currentPage) {
    const paginationFooter = document.querySelector(".content footer");
    if (!paginationFooter) return;
    paginationFooter.innerHTML = "";

    // Nút Previous
    const prevButton = document.createElement("button");
    prevButton.innerHTML = `<i class="fa-solid fa-caret-left"></i>`;
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener("click", () => goToPage(currentPage - 1));
    paginationFooter.appendChild(prevButton);

    // Các số trang
    getPageNumberList(totalPages, currentPage).forEach((item) => {
        const pageButton = document.createElement("button");
        if (item === "...") {
            pageButton.innerHTML = `<i class="fa-solid fa-ellipsis"></i>`;
            pageButton.disabled = true;
        } else {
            pageButton.textContent = item;
            if (item === currentPage) pageButton.classList.add("active");
            pageButton.addEventListener("click", () => goToPage(item));
        }
        paginationFooter.appendChild(pageButton);
    });

    // Nút Next
    const nextButton = document.createElement("button");
    nextButton.innerHTML = `<i class="fa-solid fa-caret-right"></i>`;
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener("click", () => goToPage(currentPage + 1));
    paginationFooter.appendChild(nextButton);
}

// Đi đến trang
function goToPage(page) {
    currentPage = page;
    renderProducts(getProductsOfPage(filteredProducts, currentPage));
    renderPagination(getTotalPages(filteredProducts), currentPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Reset form về trạng thái mặc định
function resetForm() {
    const brandButtons = document.querySelectorAll(".listBox .searchBtn button");
    const genderCheckboxes = document.querySelectorAll('.genderChoice input[name="gender"]');
    const sortRadios = document.querySelectorAll('.priceSelector input[name="price"]');
    
    // Reset brand buttons
    brandButtons.forEach(btn => btn.classList.remove("active"));
    const btnAll = Array.from(brandButtons).find(b => b.textContent.trim() === "Tất cả");
    if (btnAll) btnAll.classList.add("active");
    
    // Reset checkboxes
    genderCheckboxes.forEach(cb => cb.checked = false);
    
    // Reset radios
    sortRadios.forEach(radio => radio.checked = false);
    
    // Reset state
    tempFilters = {
        brand: "Tất cả",
        genders: [],
        sort: ""
    };
    
    currentFilters = {
        brand: "Tất cả",
        genders: [],
        sort: ""
    };
    
    // Hiển thị tất cả sản phẩm
    filteredProducts = [...allProducts];
    goToPage(1);
}

// Khởi tạo sự kiện cho form
function initFilterLogic() {
    const brandButtons = document.querySelectorAll(".listBox .searchBtn button");
    const genderCheckboxes = document.querySelectorAll('.genderChoice input[name="gender"]');
    const sortRadios = document.querySelectorAll('.priceSelector input[name="price"]');
    const btnResult = document.querySelector(".result");
    const btnClearAll = document.querySelector(".toolBox button");

    // 1. Xử lý click thương hiệu - CHỈ CẬP NHẬT UI
    brandButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Nếu đang active thì bỏ qua
            if (btn.classList.contains("active")) return;
            
            // Xóa active của tất cả, active cho nút được click
            brandButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
        });
    });

    // 2. Xử lý change checkbox - CHỈ CẬP NHẬT UI (tự động)
    // Không cần thêm event listener vì checkbox tự thay đổi khi click

    // 3. Xử lý change radio - CHỈ CẬP NHẬT UI (tự động)
    // Không cần thêm event listener vì radio tự thay đổi khi click

    // 4. Nút "Xem kết quả" - ÁP DỤNG BỘ LỌC
    if (btnResult) {
        btnResult.addEventListener("click", applyFilter);
    }

    // 5. Nút "Xóa tất cả" - RESET FORM
    if (btnClearAll) {
        btnClearAll.addEventListener("click", resetForm);
    }
}

// Khởi tạo trang
async function initProductPage() {
    try {
        // Load dữ liệu
        allProducts = await fetchProducts();
        filteredProducts = [...allProducts];
        
        // Set UI mặc định: active "Tất cả"
        const brandButtons = document.querySelectorAll(".listBox .searchBtn button");
        const btnAll = Array.from(brandButtons).find(b => b.textContent.trim() === "Tất cả");
        if (btnAll) {
            brandButtons.forEach(b => b.classList.remove("active"));
            btnAll.classList.add("active");
        }
        
        // Khởi tạo logic
        initFilterLogic();
        
        // Hiển thị trang đầu tiên
        goToPage(1);
        
    } catch (error) {
        console.error("Lỗi khởi tạo:", error);
    }
}

// Chạy khi DOM loaded
document.addEventListener("DOMContentLoaded", initProductPage);