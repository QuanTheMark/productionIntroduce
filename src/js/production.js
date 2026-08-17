const PRODUCTS_PER_PAGE = 9;

let allProducts = [];       // Lưu toàn bộ sản phẩm gốc từ JSON
let filteredProducts = [];  // Lưu sản phẩm sau khi đã lọc/sắp xếp
let currentPage = 1;

// Các biến lưu trạng thái bộ lọc đang chọn
let selectedBrand = "Tất cả";
let selectedGenders = [];
let selectedSort = "";

// Lấy dữ liệu từ file JSON
async function fetchProducts() {
    const response = await fetch("/products.json");
    if (!response.ok) {
        throw new Error("Không thể tải dữ liệu sản phẩm.");
    }
    const data = await response.json();
    // Đảm bảo trả về mảng dù JSON có cấu trúc nào
    return Array.isArray(data) ? data : (data.products || []);
}


function applyFilter() {
    // Lấy danh sách giới tính đang check
    selectedGenders = Array.from(genderCheckboxes)
        .filter(i => i.checked)
        .map(i => i.id === "male" ? "Nam" : "Nữ");
    // Lấy trạng thái sắp xếp đang check
    const activeSort = Array.from(sortRadios).find(i => i.checked);
    selectedSort = activeSort ? activeSort.id : "";
    // Tiến hành lọc mảng dữ liệu gốc
    filteredProducts = allProducts.filter(product => {
        // Lọc thương hiệu (so sánh không phân biệt chữ hoa/thường)
        const matchBrand = (selectedBrand === "Tất cả") || 
                           (product.brand && product.brand.toLowerCase() === selectedBrand.toLowerCase());
        
        // Lọc giới tính
        const matchGender = (selectedGenders.length === 0) || 
                            (product.gender && selectedGenders.includes(product.gender));
        return matchBrand && matchGender;
    });
    // Tiến hành sắp xếp (Sort) theo dữ liệu JSON mới của bạn
    if (selectedSort === "lowToHigh") {
        filteredProducts.sort((a, b) => a.price - b.price); // Giá thấp đến cao
    } else if (selectedSort === "highToLow") {
        filteredProducts.sort((a, b) => b.price - a.price); // Giá cao đến thấp
    } else if (selectedSort === "new") {
        // Sửa lỗi: Chuyển đổi chuỗi ngày "YYYY-MM-DD" thành mốc thời gian để so sánh chính xác
        filteredProducts.sort((a, b) => new Date(b.date) - new Date(a.date)); 
    } else if (selectedSort === "onSale") {
        // Lọc theo độ Hot dựa trên trường số lượng đã bán (sold)
        filteredProducts.sort((a, b) => (b.sold || 0) - (a.sold || 0));
    }
    // Đưa về trang 1 với danh sách sản phẩm mới đã lọc
    goToPage(1);
}


function formatPrice(price) {
    return (price || 0).toLocaleString("vi-VN") + " VNĐ";
}

function createProductCard(product) {
    const boxContent = document.createElement("div");
    boxContent.className = "boxContent";

    boxContent.innerHTML = `
        <div class="boxContent_image" style="background-image: url('${product.image?.thumbnail || ''}')"></div>
        <h3>${product.name}</h3>
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

function getProductsOfPage(products, page) {
    const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
    return products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
}

function getTotalPages(products) {
    return Math.max(1, Math.ceil(products.length / PRODUCTS_PER_PAGE));
}

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

function renderPagination(totalPages, currentPage) {
    const paginationFooter = document.querySelector(".content footer");
    if (!paginationFooter) return;
    paginationFooter.innerHTML = "";

    const prevButton = document.createElement("button");
    prevButton.innerHTML = `<i class="fa-solid fa-caret-left"></i>`;
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener("click", () => goToPage(currentPage - 1));
    paginationFooter.appendChild(prevButton);

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

    const nextButton = document.createElement("button");
    nextButton.innerHTML = `<i class="fa-solid fa-caret-right"></i>`;
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener("click", () => goToPage(currentPage + 1));
    paginationFooter.appendChild(nextButton);
}

function goToPage(page) {
    currentPage = page;
    renderProducts(getProductsOfPage(filteredProducts, currentPage));
    renderPagination(getTotalPages(filteredProducts), currentPage);
    window.scrollTo({ behavior: "smooth" });
}


function initFilterLogic() {
    const brandButtons = document.querySelectorAll(".listBox .searchBtn button");
    const genderCheckboxes = document.querySelectorAll('.genderChoice input[name="gender"]');
    const sortRadios = document.querySelectorAll('.priceSelector input[name="price"]');
    const btnResult = document.querySelector("button.result");
    const btnClearAll = document.querySelector(".toolBox button");

    // Xử lý click chọn thương hiệu và thêm class active
    brandButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Xóa class active của tất cả các nút thương hiệu trước đó
            brandButtons.forEach(b => b.classList.remove("active"));
            
            // Thêm class active vào nút vừa được bấm
            btn.classList.add("active");
            
            // Cập nhật giá trị thương hiệu được chọn
            selectedBrand = btn.textContent.trim();
        });
    });

    // Hàm áp dụng bộ lọc (giữ nguyên logic của bạn)
    function applyFilter() {
        selectedGenders = Array.from(genderCheckboxes)
            .filter(i => i.checked)
            .map(i => i.id === "male" ? "Nam" : "Nữ");

        const activeSort = Array.from(sortRadios).find(i => i.checked);
        selectedSort = activeSort ? activeSort.id : "";

        filteredProducts = allProducts.filter(product => {
            const matchBrand = (selectedBrand === "Tất cả") || 
                               (product.brand && product.brand.toLowerCase() === selectedBrand.toLowerCase());
            const matchGender = (selectedGenders.length === 0) || 
                                (product.gender && selectedGenders.includes(product.gender));
            return matchBrand && matchGender;
        });

        if (selectedSort === "lowToHigh") {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (selectedSort === "highToLow") {
            filteredProducts.sort((a, b) => b.price - a.price);
        } else if (selectedSort === "new") {
            filteredProducts.sort((a, b) => b.id - a.id); 
        } else if (selectedSort === "onSale") {
            filteredProducts.sort((a, b) => (b.sold || 0) - (a.sold || 0));
        }

        goToPage(1);
    }

    if (btnResult) {
        btnResult.addEventListener("click", applyFilter);
    }

    // Khi bấm "Xóa tất cả" -> đưa nút active quay về "Tất cả"
    if (btnClearAll) {
        btnClearAll.addEventListener("click", () => {
            brandButtons.forEach(b => b.classList.remove("active"));
            
            // Tìm nút "Tất cả" và gán lại class active
            const btnAll = Array.from(brandButtons).find(b => b.textContent.trim() === "Tất cả");
            if (btnAll) btnAll.classList.add("active");
            
            selectedBrand = "Tất cả";
            genderCheckboxes.forEach(i => i.checked = false);
            sortRadios.forEach(i => i.checked = false);

            filteredProducts = [...allProducts];
            goToPage(1);
        });
    }
}


// Khởi tạo trang khi tải xong
async function initProductPage() {
    try {
        allProducts = await fetchProducts();
        filteredProducts = [...allProducts]; 
        
        // Kích hoạt bộ lắng nghe sự kiện
        initFilterLogic();
        
        // TỰ ĐỘNG THÊM ACTIVE CHO NÚT "TẤT CẢ" KHI TẢI TRANG
        const brandButtons = document.querySelectorAll(".listBox .searchBtn button");
        const btnAll = Array.from(brandButtons).find(b => b.textContent.trim() === "Tất cả");
        if (btnAll) {
            btnAll.classList.add("active");
        }
        
        // Hiển thị trang sản phẩm đầu tiên
        goToPage(1);
    } catch (error) {
        console.error("Lỗi khởi tạo danh sách sản phẩm:", error);
    }
}

document.addEventListener("DOMContentLoaded", initProductPage);
