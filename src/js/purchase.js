// purchasePopup.js
function formatPrice(price) {
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

// Tạo popup mua hàng
function createPurchasePopup(product) {
    const overlay = document.createElement("div");
    overlay.className = "purchase-overlay";

    const popup = document.createElement("div");
    popup.className = "purchase-popup";

    const closeBtn = document.createElement("button");
    closeBtn.className = "purchase-close-btn";
    closeBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    closeBtn.onclick = closePopup;

    const productImage = document.createElement("div");
    productImage.className = "purchase-product-image";
    productImage.style.backgroundImage = `url('${product.image?.thumbnail || ''}')`;

    const productName = document.createElement("h2");
    productName.className = "purchase-product-name";
    productName.textContent = product.name || "Sản phẩm";

    const productPrice = document.createElement("p");
    productPrice.className = "purchase-product-price";
    productPrice.textContent = formatPrice(product.price);

    const quantityWrapper = document.createElement("div");
    quantityWrapper.className = "purchase-quantity-wrapper";

    const quantityLabel = document.createElement("label");
    quantityLabel.textContent = "Số lượng:";

    const quantityControls = document.createElement("div");
    quantityControls.className = "purchase-quantity-controls";

    const minusBtn = document.createElement("button");
    minusBtn.textContent = "-";
    minusBtn.className = "purchase-qty-btn";

    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.min = 1;
    quantityInput.max = 10;
    quantityInput.value = 1;
    quantityInput.className = "purchase-qty-input";

    const plusBtn = document.createElement("button");
    plusBtn.textContent = "+";
    plusBtn.className = "purchase-qty-btn";

    minusBtn.onclick = () => {
        let currentValue = parseInt(quantityInput.value) || 1;
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
            updateTotalPrice();
        }
    };

    plusBtn.onclick = () => {
        let currentValue = parseInt(quantityInput.value) || 1;
        if (currentValue < 10) {
            quantityInput.value = currentValue + 1;
            updateTotalPrice();
        }
    };

    quantityInput.onchange = updateTotalPrice;

    quantityControls.appendChild(minusBtn);
    quantityControls.appendChild(quantityInput);
    quantityControls.appendChild(plusBtn);
    quantityWrapper.appendChild(quantityLabel);
    quantityWrapper.appendChild(quantityControls);

    const totalWrapper = document.createElement("div");
    totalWrapper.className = "purchase-total";

    const totalLabel = document.createElement("span");
    totalLabel.textContent = "Tổng tiền: ";

    const totalPrice = document.createElement("span");
    totalPrice.className = "purchase-total-price";
    totalPrice.textContent = formatPrice(product.price);

    totalWrapper.appendChild(totalLabel);
    totalWrapper.appendChild(totalPrice);

    const buyBtn = document.createElement("button");
    buyBtn.className = "purchase-buy-btn";
    buyBtn.textContent = "Mua hàng";

    function updateTotalPrice() {
        const quantity = parseInt(quantityInput.value) || 1;
        const total = (product.price || 0) * quantity;
        totalPrice.textContent = formatPrice(total);
    }

    buyBtn.onclick = () => handlePurchase(product, quantityInput, totalPrice, buyBtn);

    popup.appendChild(closeBtn);
    popup.appendChild(productImage);
    popup.appendChild(productName);
    popup.appendChild(productPrice);
    popup.appendChild(quantityWrapper);
    popup.appendChild(totalWrapper);
    popup.appendChild(buyBtn);
    overlay.appendChild(popup);

    return overlay;
}

function handlePurchase(product, quantityInput, totalPriceElement, buyBtn) {
    const quantity = parseInt(quantityInput.value) || 1;
    const totalAmount = (product.price || 0) * quantity;

    console.log("=== BẮT ĐẦU MUA HÀNG ===");
    console.log("Sản phẩm:", product.name);
    console.log("Số lượng:", quantity);
    console.log("Tổng tiền:", totalAmount);

    // Lấy danh sách user
    const userListJSON = localStorage.getItem("userList");
    console.log("userListJSON:", userListJSON);
    
    if (!userListJSON) {
        showNotification("Vui lòng đăng nhập để mua hàng!", "error");
        return;
    }
    
    const userList = JSON.parse(userListJSON);
    console.log("userList type:", typeof userList);
    console.log("userList isArray:", Array.isArray(userList));
    console.log("userList:", userList);
    

    if (!Array.isArray(userList)) {
        console.warn("userList không phải mảng, đang chuyển đổi...");
        // Nếu userList là object, chuyển thành mảng
        const newUserList = [userList];
        localStorage.setItem('userList', JSON.stringify(newUserList));
        userList = newUserList;
        console.log("Đã chuyển thành mảng:", userList);
    }

    // Lấy user đang đăng nhập
    const userActiveJSON = localStorage.getItem("userActive");
    console.log("userActiveJSON:", userActiveJSON);
    
    if (!userActiveJSON) {
        showNotification("Vui lòng đăng nhập để mua hàng!", "error");
        return;
    }

    const currentUser = JSON.parse(userActiveJSON);
    console.log("currentUser:", currentUser);
    
    if (!currentUser || !currentUser.username) {
        showNotification("Vui lòng đăng nhập để mua hàng!", "error");
        return;
    }

    // Tìm user trong danh sách
    const currentUsername = currentUser.username;
    console.log("Tìm user với username:", currentUsername);
    
    const user = userList.find(u => u.username === currentUsername);
    console.log("User tìm thấy:", user);
    
    if (!user) {
        showNotification("Không tìm thấy thông tin người dùng!", "error");
        return;
    }

    // Kiểm tra số dư
    console.log("Số dư hiện tại:", user.userWallet);
    console.log("Cần thanh toán:", totalAmount);
    
    if (user.userWallet < totalAmount) {
        showNotification(`Số dư không đủ! Cần thêm ${formatPrice(totalAmount - user.userWallet)}`, "error");
        return;
    }

    // Trừ tiền
    user.userWallet -= totalAmount;
    currentUser.userWallet = user.userWallet;

    console.log("Số dư sau khi trừ:", user.userWallet);

    // Lưu lại
    localStorage.setItem("userList", JSON.stringify(userList));
    localStorage.setItem("userActive", JSON.stringify(currentUser));

    console.log("Đã lưu vào localStorage");

    // Thông báo thành công
    showNotification(`Mua thành công! Đã mua ${quantity} sản phẩm với ${formatPrice(totalAmount)}`, "success");
    updateWalletDisplay(user.userWallet);

    // Đóng popup
    setTimeout(() => {
        const overlay = document.querySelector(".purchase-overlay");
        if (overlay) overlay.remove();
    }, 2000);

    buyBtn.disabled = true;
    buyBtn.textContent = "Đã mua thành công!";
}
// Hiển thị thông báo
function showNotification(message, type = "info") {
    const oldNotification = document.querySelector(".custom-notification");
    if (oldNotification) {
        oldNotification.remove();
    }

    const notification = document.createElement("div");
    notification.className = "custom-notification";
    notification.textContent = message;

    if (type === "error") {
        notification.style.background = "#e74c3c";
    } else if (type === "success") {
        notification.style.background = "#2ecc71";
    } else {
        notification.style.background = "#3498db";
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Cập nhật hiển thị số dư
function updateWalletDisplay(amount) {
    const walletElements = document.querySelectorAll(".user-wallet, .wallet-amount");
    walletElements.forEach(el => {
        el.textContent = formatPrice(amount);
    });
}

// Đóng popup
function closePopup() {
    const overlay = document.querySelector(".purchase-overlay");
    if (overlay) {
        overlay.remove();
    }
}

// Render chi tiết sản phẩm
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