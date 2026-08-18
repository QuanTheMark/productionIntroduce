window.addEventListener("DOMContentLoaded", function() {
    document.body.classList.add("loaded");
    userPanelLoaded();
    pageRender();
});

const MOBILE_BREAKPOINT = 442;


let isMobileViewport = window.innerWidth <= MOBILE_BREAKPOINT;

let resizeTimeoutId = null;

window.addEventListener("resize", function() {
    clearTimeout(resizeTimeoutId);


    resizeTimeoutId = setTimeout(function() {
        const nextIsMobileViewport = window.innerWidth <= MOBILE_BREAKPOINT;

        if (nextIsMobileViewport !== isMobileViewport) {
            isMobileViewport = nextIsMobileViewport;
            userPanelLoaded();
        }
    }, 150);
});


function pageRender() {
    const pages = document.querySelectorAll(".toolBar a");

    pages.forEach(page => {
        page.addEventListener("click", function(event) {
            event.preventDefault();
            let eventHref = this.href;

            document.body.classList.remove("loaded");
            setTimeout(function() {
                window.location.href = eventHref;
            }, 800);
        });
    });
}

function escapeHtml(text) {
    const tempDiv = document.createElement("div");
    tempDiv.textContent = text;
    return tempDiv.innerHTML;
}



function buildGuestPanelHTML() {
    return `
        <div class="userPanel_image">
            <span><i class="fa-solid fa-user"></i></span>
        </div>
        <div class="registerBtn">
            <a href="register.html">Đăng ký</a>
        </div>
        <div class="loginBtn">
            <a href="login.html">Đăng nhập</a>
        </div>
    `;
}


function buildLoggedInPanelHTML(userActive) {
    const safeUsername = escapeHtml(userActive.username);
    const formattedWallet = (userActive.userWallet || 0).toLocaleString("vi-VN") + " VNĐ";

    const usernameLabel = isMobileViewport
        ? ""
        : `<a href="#"><h3>${safeUsername}</h3></a>`;

    return `
        <div class="userPanel_image active"></div>
        <div class="setting">
            ${usernameLabel}
            <div class="dropdown-content">
                <div class="userWallet">
                    <span><i class="fa-solid fa-wallet" style="color: rgb(0, 0, 0);"></i>: </span>
                    <p>${formattedWallet}</p>
                </div>
                <button class="logOutBtn">Đăng xuất</button>
            </div>
        </div>
    `;
}


function userPanelLoaded() {
    const userPanel = document.querySelector(".userPanel");
    if (!userPanel) return;

    const userActiveJSON = localStorage.getItem("userActive");
    let userActive = null;

    if (userActiveJSON) {
        try {
            userActive = JSON.parse(userActiveJSON);
        } catch (error) {
            console.error("Lỗi parse userActive:", error);
            userActive = null;
        }
    }


    const isLoggedIn = Boolean(userActive && userActive.username);

    userPanel.innerHTML = isLoggedIn
        ? buildLoggedInPanelHTML(userActive)
        : buildGuestPanelHTML();

    if (!isLoggedIn) return;

    const userImg = userPanel.querySelector(".userPanel_image");
    if (userImg) {
        userImg.style.backgroundImage =
            `url('https://ui-avatars.com/api/?name=${encodeURIComponent(userActive.username)}&background=random')`;
        userImg.style.backgroundSize = "cover";
        userImg.style.backgroundPosition = "center";
    }

    const userLogout = userPanel.querySelector(".logOutBtn");
    if (userLogout) {
        userLogout.onclick = function() {
            localStorage.removeItem("userActive");
            window.location.reload();
        };
    }
}