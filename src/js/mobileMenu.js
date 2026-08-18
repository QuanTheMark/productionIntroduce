// ===== MOBILE MENU =====
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenuOverlay');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const overlayBg = document.createElement('div');
    overlayBg.className = 'mobile-overlay-bg';
    document.body.appendChild(overlayBg);

  
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        overlayBg.classList.toggle('active');
        document.body.style.overflow = 'hidden';
    });

    function closeMobileMenu() {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        overlayBg.classList.remove('active');
        document.body.style.overflow = '';
    }

    mobileMenuClose.addEventListener('click', closeMobileMenu);
    overlayBg.addEventListener('click', closeMobileMenu);

    
    function updateMobileUserInfo() {
        const mobileUserInfo = document.getElementById('mobileUserInfo');
        const mobileMenuFooter = document.querySelector('.mobile-menu-footer');
        const userActiveJSON = localStorage.getItem('userActive');
        
        if (userActiveJSON) {
            try {
                const userActive = JSON.parse(userActiveJSON);
                if (userActive && userActive.username) {
                    const formattedWallet = (userActive.userWallet || 0).toLocaleString("vi-VN") + " VNĐ";
                    
                    mobileUserInfo.innerHTML = `
                        <div class="mobile-user-avatar" style="background-image: url('https://ui-avatars.com/api/?name=${encodeURIComponent(userActive.username)}&background=random')"></div>
                        <div>
                            <div class="mobile-user-name">${userActive.username}</div>
                            <div class="mobile-user-wallet"><span><i class="fa-solid fa-wallet" style="color: rgb(0, 0, 0);"></i>: </span> ${formattedWallet}</div>
                        </div>
                    `;
                    
                    mobileMenuFooter.innerHTML = `
                        <button class="mobile-logout-btn" id="mobileLogoutBtn">
                            <i class="fa-solid fa-sign-out-alt"></i> Đăng xuất
                        </button>
                    `;
                    
                    const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');
                    if (mobileLogoutBtn) {
                        mobileLogoutBtn.addEventListener('click', function() {
                            localStorage.removeItem('userActive');
                            window.location.reload();
                        });
                    }
                    
                    return;
                }
            } catch (error) {
                console.error('Lỗi parse userActive:', error);
            }
        }
        

        mobileUserInfo.innerHTML = `
            <div class="mobile-user-avatar" style="background-color: var(--secondary-gray-color); display: flex; align-items: center; justify-content: center;">
                <i class="fa-solid fa-user" style="font-size: 1.5rem; color: #999;"></i>
            </div>
            <div>
                <div class="mobile-user-name">Khách</div>
                <div class="mobile-user-wallet">Chưa đăng nhập</div>
            </div>
        `;
        
        mobileMenuFooter.innerHTML = `
            <a href="register.html" style="display: block; width: 100%; padding: 12px; text-align: center; background-color: var(--secondary-gray-color); color: var(--black-color); text-decoration: none; border-radius: 8px; margin-bottom: 10px; font-weight: 600;">Đăng ký</a>
            <a href="login.html" style="display: block; width: 100%; padding: 12px; text-align: center; background-color: var(--black-color); color: var(--white-color); text-decoration: none; border-radius: 8px; font-weight: 600;">Đăng nhập</a>
        `;
    }
    
    updateMobileUserInfo();

    const originalUserPanelLoaded = window.userPanelLoaded;
    if (originalUserPanelLoaded) {
        window.userPanelLoaded = function() {
            originalUserPanelLoaded();
            updateMobileUserInfo();
        };
    }
});