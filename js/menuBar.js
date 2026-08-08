const pages = document.querySelectorAll(".toolBar a");
    pages.forEach(page => {
        page.addEventListener("click", (event) =>{
            pages.forEach(p => {
                p.nextElementSibling.classList.remove("active");
            })

            event.target.nextElementSibling.classList.add("active");

        });

    });

    let deviceWidth = window.innerWidth > 442;
    renderMenu();
   
    window.addEventListener('resize', function(){
        const currentWidth = window.innerWidth > 442;
        if(deviceWidth != currentWidth){
            deviceWidth = currentWidth;
            renderMenu();
        }
    })



 function renderMenu(){
    const homePage = document.querySelector('.userPanel');
    const userActive  = JSON.parse(localStorage.getItem('userActive'));
  

    if(deviceWidth){
    if(userActive != null ) {
        homePage.innerHTML = 
        ` <div class = "userPanel_image active"></div>
                <div class = "setting">
                    <a href = "#"><h3>${userActive.username}</h3></a>
                    <div class = "dropdown-content">
                    <button class = "logOutBtn">Logout</button>
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
            homePage.innerHTML = 
            `
            <div class = "userPanel_image">
                    <span class="material-symbols-outlined">person</span>
                </div>
                <div class ="registerBtn">
                    <a href="./register.html">Register</a>
                </div>
                <div class ="loginBtn">
                    <a href="./login.html">Login</a>
            </div>
            `
        }
}else{
    if(userActive != null){
        homePage.innerHTML = 
    `   <div class = "menuBtn"></div>
        <div class = "sideBar">
            <div class = "menuClose"></div>
            <div class = "userPanel_mobile">
                <div class = "userPanel_image active"></div>
                <ul>
                <li><a href = "#">Home</a></li>    
                <li><a href = "#">About</a></li>
                <li><a href = "#">Production</a></li>  
                <li><a href = "#">Contact</a></li>     
                </ul>
            </div>
            <div class = "mobileLogout">
                <button class = "logOutBtn">Logout</button>
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
        homePage.innerHTML = 
    `   <div class = "menuBtn"></div>
        <div class = "sideBar">
            <div class = "menuClose"></div>
            <div class = "userPanel_mobile">
                <div class = "userPanel_image">
                        <span class="material-symbols-outlined">person</span>
                </div>
                <ul>
                <li><a href = "./register.html">Register</a></li>    
                <li><a href = "./login.html">Login</a></li>   
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