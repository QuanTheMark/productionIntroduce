function formatPrice(price) {
    // Thêm kiểm tra phòng trường hợp price bị undefined hoặc null
    return (price || 0).toLocaleString("vi-VN") + " VNĐ";
}

function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

async function fetchProducts() {
    const response = await fetch("./products.json");

    if (!response.ok) {
        throw new Error("Không thể tải dữ liệu sản phẩm.");
    }

    return response.json();
}


function renderProductDetail(product) {
    const updates = [
        { selector: ".productionIllustration_image", prop: "style.backgroundImage", value: `url('${product.image?.thumbnail}')` },
        { selector: ".banners_image.side", prop: "style.backgroundImage", value: `url('${product.image?.side}')` },
        { selector: ".banners_image.above", prop: "style.backgroundImage", value: `url('${product.image?.above}')` },
        { selector: ".banners_image.behind", prop: "style.backgroundImage", value: `url('${product.image?.behind}')` },
        { selector: ".banners_image.underneath", prop: "style.backgroundImage", value: `url('${product.image?.underneath}')` },
        { selector: ".productionDetails .title h1", prop: "textContent", value: product.name?.toUpperCase() },
        { selector: ".order_price h2", prop: "textContent", value: formatPrice(product.price) }
    ];

    updates.forEach(({ selector, prop, value }) => {
        const element = document.querySelector(selector);
        if (element) {
            if (prop.startsWith("style.")) {
                const styleProp = prop.split(".")[1];
                element.style[styleProp] = value;
            } else {
                element[prop] = value;
            }
        }
    });

    document.title = `${product.name} | Chi tiết sản phẩm`;

    const cartBtn = document.querySelector(".order_cart");
    if (cartBtn) {
        const newCartBtn = cartBtn.cloneNode(true);
        cartBtn.parentNode.replaceChild(newCartBtn, cartBtn);
        
        newCartBtn.addEventListener("click", () => {
            const popup = createPurchasePopup(product);
            document.body.appendChild(popup);
        });
    }
}

async function initProductDetailPage() {
    sizePicker();
    try {
        const productId = getProductIdFromUrl();
        if (!productId) {
            console.warn("Không tìm thấy tham số ID trên URL.");
        }

        const data = await fetchProducts();
        const productList = Array.isArray(data) ? data : (data.products || []);

        let product = productList.find((item) => String(item.id) === String(productId));

        if (!product) {
            product = productList[0];
        }

        if (!product) {
            throw new Error("Không có dữ liệu sản phẩm nào tồn tại.");
        }

        renderProductDetail(product);
    } catch (error) {
        console.error("Lỗi khởi tạo chi tiết sản phẩm:", error);
    }
}

document.addEventListener("DOMContentLoaded", initProductDetailPage);
