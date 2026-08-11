
    window.addEventListener("DOMContentLoaded", function() {
        document.body.classList.add("loaded"); 
    
});
    let deviceWidth = window.innerWidth > 442;
   
    userPanelLoaded();
    pageRender();



   function pageRender(){


    const start = document.querySelector(".explore_btnExplore");
    const main = document.querySelector("#main");
    const footer = document.querySelector("#footer");
    start.addEventListener("click", function(){
        main.innerHTML = 

        `
         <section class = "brands">
            <div class = "plate nike"></div>
            <div class = "plate adidas"></div>
            <div class = "plate puma"></div>
            <div class = "plate newBalance"></div>
            <div class = "plate asics"></div>
            <div class = "plate bitis"></div>
            <div class = "plate ananas"></div>
        </section>

         <section class = "onSaleProduction">
            <div class="onSaleProduction_text">
                <h2>SẢN PHẨM BÁN CHẠY</h2>
                <p>Khám phá những đôi Sneakers được yêu thích nhất và dẫn đầu xu hướng trong năm 2026.</p>
            </div>

            <div class = "referentialProduction">
                <div class="referentialProduction_container production1">
                    <div class = "container_information">
                        <div class = "order"><h1>01</h1></div>
                        <div class = "title"><h2>Nike Air Force 1<sup>'</sup>07</h2></div>
                        <div class = "price"><h3>3.500.000</h3></div>
                        <button class = "containerBtn btn-customs">Xem chi tiết</button>
                    </div>
                </div>

                <div class="referentialProduction_container production2">
                    <div class = "container_information">
                        <div class = "order"><h1>02</h1></div>
                        <div class = "title"><h2> Adidas Samba OG</h2></div>
                        <div class = "price"><h3>3.500.000</h3></div>
                        <button class = "containerBtn btn-customs">Xem chi tiết</button>
                    </div>
                </div>

                <div class="referentialProduction_container production3">
                    <div class = "container_information">
                        <div class = "order"><h1>03</h1></div>
                        <div class = "title"><h2>New Balance 550</h2></div>
                        <div class = "price"><h3>3.500.000</h3></div>
                        <button class = "containerBtn btn-customs">Xem chi tiết</button>
                    </div>
                </div>
            </div>
        </section>
        <section class = "productionReview">
            <div class = "productionReview_text">
                <h2>ĐÁNH GIÁ THỰC TẾ</h2>
                <p>Sự hài lòng của bạn là động lực để Abydas phát triển mỗi ngày.</p>
            </div>

            <div class = "banners">
                    <button class = "btnLeft"></button>
         
            <div class = "productEvaluation">
                <div class = "productEvaluation_container">
                    <div class = "container_productionImage"></div>
                    <div class = "container_reviewer">
                        <h3>Quỳnh Chi</h3>
                        <h4>@qchicute</h4>
                        <div class = "reviewer_rate">
                            <span class="material-symbols-outlined">star</span>
                            <span class="material-symbols-outlined">star</span>
                            <span class="material-symbols-outlined">star</span>
                            <span class="material-symbols-outlined">star</span>
                            <span class="material-symbols-outlined">star</span>
                        </div>
                        <div class = "reviewer_feedback">
                        <p>Mình rất hài lòng với chất lượng sản phẩm của Abydas. Giày chuẩn Authentic 100%, form đẹp, đi ôm chân. Giao hàng nhanh và đóng gói cẩn thận.</p>
                        </div>
                    </div>
                </div>

                   <div class = "productEvaluation_container middle">
                    <div class = "container_productionImage"></div>
                    <div class = "container_reviewer">
                        <h3>Gia Bảo</h3>
                        <h4>@baobao</h4>
                        <div class = "reviewer_rate">
                            <span class="material-symbols-outlined">star</span>
                            <span class="material-symbols-outlined">star</span>
                            <span class="material-symbols-outlined">star</span>
                            <span class="material-symbols-outlined">star</span>
                            <span class="material-symbols-outlined">star</span>
                        </div>
                        <div class = "reviewer_feedback">
                        <p>Abydas không chỉ bán giày mà còn mang đến trải nghiệm tuyệt vời. Website dễ dùng, sản phẩm đa dạng và luôn đăng tải những mặt hàng mới lạ.</p>
                        </div>
                    </div>
                </div>

                   <div class = "productEvaluation_container">
                    <div class = "container_productionImage"></div>
                    <div class = "container_reviewer">
                        <h3>Minh Quân</h3>
                        <h4>@mquan</h4>
                        <div class = "reviewer_rate">
                            <span class="material-symbols-outlined">star</span>
                            <span class="material-symbols-outlined">star</span>
                            <span class="material-symbols-outlined">star</span>
                            <span class="material-symbols-outlined">star</span>
                            <span class="material-symbols-outlined">star</span>
                        </div>
                        <div class = "reviewer_feedback">
                        <p>Đã mua nhiều lần tại Adydas và chưa bao giờ thất vọng. Sản phẩm chất lượng, giá hợp lí và dịch vụ chăm sóc khách hàng rất tốt</p>
                        </div>
                    </div>
                </div>
            </div>
                <button class = "btnRight"></button>
        </div>
        </section>

        `

        footer.innerHTML = 
        `
        <div class = "footer">
           <div class = "logo">
                    <div class ="logo_image"></div>
                    <h2>Abydas</h2>
                </div>

                <div>
                    <p>Copyright &copy; 2026 <b>Abydas</b>. All rights reserved.</p>
                </div>

                <div class ="term">
                    <a href="#">Chính sách bảo mật</a>
                    <div></div>
                    <a href="#">Điều khoản sử dụng</a>
            </div>
        </div>
        `
       if(main){
        main.scrollIntoView({
            behavior: "smooth"
        })
       }
    })



    const pages = document.querySelectorAll(".toolBar a");
      localStorage.setItem("pageTransition", "triggered");
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
                    <span class="material-symbols-outlined">person</span>
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
                        <span class="material-symbols-outlined">person</span>
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