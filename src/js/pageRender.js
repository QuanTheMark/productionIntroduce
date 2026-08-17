
window.addEventListener("DOMContentLoaded", function() {
    document.body.classList.add("loaded");
    userPanelLoaded();
    pageRender();
});


let deviceWidth = window.innerWidth > 442;

window.addEventListener("resize", function() {
    deviceWidth = window.innerWidth > 442;

    userPanelLoaded();
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


function userPanelLoaded() {
    const userPanel = document.querySelector('.userPanel');
    if (!userPanel) return;
    

    const userActiveJSON = localStorage.getItem('userActive');
    

    if (!deviceWidth) {
       
        userPanel.innerHTML = `
            <div class="userPanel_image">
                <span><i class="fa-solid fa-user"></i></span>
            </div>
            <div class="registerBtn">
                <a href="/register.html">Đăng ký</a>
            </div>
            <div class="loginBtn">
                <a href="/login.html">Đăng nhập</a>
            </div>
        `;
        return;
    }
    

    if (!userActiveJSON) {
        userPanel.innerHTML = `
            <div class="userPanel_image">
                <span><i class="fa-solid fa-user"></i></span>
            </div>
            <div class="registerBtn">
                <a href="/register.html">Đăng ký</a>
            </div>
            <div class="loginBtn">
                <a href="/login.html">Đăng nhập</a>
            </div>
        `;
        return;
    }
    
   
    let userActive;
    try {
        userActive = JSON.parse(userActiveJSON);
    } catch (error) {
        console.error("Lỗi parse userActive:", error);
        return;
    }
    
   
    if (!userActive || !userActive.username) {
        userPanel.innerHTML = `
            <div class="userPanel_image">
                <span><i class="fa-solid fa-user"></i></span>
            </div>
            <div class="registerBtn">
                <a href="/register.html">Đăng ký</a>
            </div>
            <div class="loginBtn">
                <a href="/login.html">Đăng nhập</a>
            </div>
        `;
        return;
    }
    

    const formattedWallet = (userActive.userWallet || 0).toLocaleString("vi-VN") + " VNĐ";
    

    userPanel.innerHTML = `
        <div class="userPanel_image active"></div>
        <div class="setting">
            <a href="#"><h3>${userActive.username}</h3></a>
            <div class="dropdown-content">
                <div class="userWallet">
                    <span><i class="fa-solid fa-wallet" style="color: rgb(0, 0, 0);"></i>: </span>
                    <p>${formattedWallet}</p>
                </div>
                <button class="logOutBtn">Đăng xuất</button>
            </div>
        </div>
    `;

    const userImg = document.querySelector('.userPanel_image');
    if (userImg) {
        userImg.style.backgroundImage = `url('https://ui-avatars.com/api/?name=${encodeURIComponent(userActive.username)}&background=random')`;
        userImg.style.backgroundSize = 'cover';
        userImg.style.backgroundPosition = 'center';
    }
    

    const userLogout = document.querySelector('.logOutBtn');
    if (userLogout) {
        userLogout.onclick = function() {
            localStorage.removeItem('userActive');
            window.location.reload();
        };
    }
}