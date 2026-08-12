
    window.addEventListener("DOMContentLoaded", function() {
        document.body.classList.add("loaded"); 
    
});
    let deviceWidth = window.innerWidth > 442;
   
    userPanelLoaded();
    pageRender();



   function pageRender(){
    const pages = document.querySelectorAll(".toolBar a");

    pages.forEach(page => {
        page.addEventListener("click", function(event){
            event.preventDefault();
            let eventHref = this.href;

                document.body.classList.remove("loaded");
                setTimeout(function(){
                window.location.href = eventHref;
                }, 800)
            
        })

    })
   } 

 function userPanelLoaded(){
    const userPanel = document.querySelector('.userPanel');
    const userActive  = JSON.parse(localStorage.getItem('userActive'));
  

    if(deviceWidth){
    if(userActive != null ) {
        userPanel.innerHTML = 
        ` <div class = "userPanel_image active"></div>
                <div class = "setting">
                    <a href = "#"><h3>${userActive.username}</h3></a>
                    <div class = "dropdown-content">
                        <div class ="userWallet">
                            <span><i class="fa-solid fa-wallet" style="color: rgb(0, 0, 0);"></i>: </span>
                            <p>${userActive.userWallet} VNĐ</p>
                        </div>
                        <button class = "logOutBtn">Đăng xuất</button>
                    </div>
                </div>`
        
        const userImg = document.querySelector('.userPanel_image');
        userImg.style.backgroundImage = `url('https://ui-avatars.com/api/?name=${encodeURIComponent(userActive.username)}&background=random')`;
        const userLogout = document.querySelector('.logOutBtn');
        userLogout.onclick = function(){
            localStorage.removeItem('userActive');
            window.location.reload();
        }
        

    }else{
            userPanel.innerHTML = 
            `
                <div class = "userPanel_image">
                    <span><i class="fa-solid fa-user"></i></span>
                </div>
                <div class ="registerBtn">
                    <a href="/register.html">Đăng ký</a>
                </div>
                <div class ="loginBtn">
                    <a href="/login.html">Đăng nhập</a>
            </div>
            `
        }
}else{
    if(userActive != null){
        userPanel.innerHTML = 
    `   <div class = "menuBtn"></div>
        <div class = "sideBar">
            <div class = "menuClose"></div>
            <div class = "userPanel_mobile">
                <div class = "userPanel_image active"></div>
                <ul>
                <li><a href = "#">Trang chủ</a></li>    
                <li><a href = "#">Sản phẩm</a></li>
                <li><a href = "#">Liên hệ</a></li>  
                <li><a href = "#">Về chúng tôi</a></li>     
                </ul>
            </div>
           
            <div class = "mobileLogout">
                <button class = "logOutBtn">Đăng xuất</button>
            </div>
        </div>
    `;

        const userImg = document.querySelector('.userPanel_image');
        userImg.style.backgroundImage = `url('https://ui-avatars.com/api/?name=${encodeURIComponent(userActive.username)}&background=random')`;
        const userLogout = document.querySelector('.logOutBtn');
        userLogout.onclick = function(){
            localStorage.removeItem('userActive');
            window.location.reload();
        }
    }
    else{
        userPanel.innerHTML = 
    `   <div class = "menuBtn"></div>
        <div class = "sideBar">
            <div class = "menuClose"></div>
            <div class = "userPanel_mobile">
                <div class = "userPanel_image">
                        <span><i class="fa-solid fa-user"></i></span>
                </div>
                <ul>
                <li><a href = "/register.html">Đăng ký</a></li>    
                <li><a href = "/login.html">Đăng nhập</a></li>   
                </ul>
            </div>
        </div>
    `;
    }
    

    const sideBar = document.querySelector('.sideBar');
    const menuBtn = document.querySelector('.menuBtn');
    const menuClose = document.querySelector('.menuClose');
    menuBtn.onclick = function(){
        sideBar.style.opacity = "1";
        sideBar.style.transform = "translateX(0)";
    }
    
    menuClose.onclick = function(){
        sideBar.style.opacity = "0";
        sideBar.style.transform = "translateX(100%)";
    }
}
    }