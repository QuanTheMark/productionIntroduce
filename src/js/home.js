    const start = document.querySelector(".explore_btnExplore");
    const main = document.querySelector("#main");
    const footer = document.querySelector("#footer");
    footer.style.display = "none";
    start.addEventListener("click", function(){
        footer.style.display = "block";
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
                    <button class = "btnLeft"><i class="fa-solid fa-circle-arrow-left" style="color: rgb(0, 0, 0);"></i></button>
         
            <div class = "productEvaluation">
                <div class = "productEvaluation_container">
                    <div class = "container_productionImage"></div>
                    <div class = "container_reviewer">
                        <h3>Quỳnh Chi</h3>
                        <h4>@qchicute</h4>
                        <div class = "reviewer_rate">
                            <span><i class="fa-solid fa-star"></i></span>
                            <span><i class="fa-solid fa-star"></i></span>
                            <span><i class="fa-solid fa-star"></i></span>
                            <span><i class="fa-solid fa-star"></i></span>
                            <span><i class="fa-regular fa-star"></i></span>
                          
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
                            <i class="fa-solid fa-star" style="color: rgb(255, 255, 255);"></i>
                            <i class="fa-solid fa-star" style="color: rgb(255, 255, 255);"></i>
                            <i class="fa-solid fa-star" style="color: rgb(255, 255, 255);"></i>
                            <i class="fa-solid fa-star" style="color: rgb(255, 255, 255);"></i>
                            <span><i class="fa-regular fa-star"></i></span>
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
                            <span><i class="fa-solid fa-star"></i></span>
                            <span><i class="fa-solid fa-star"></i></span>
                            <span><i class="fa-solid fa-star"></i></span>
                            <span><i class="fa-solid fa-star"></i></span>
                            <span><i class="fa-regular fa-star"></i></span>
                        </div>
                        <div class = "reviewer_feedback">
                        <p>Đã mua nhiều lần tại Adydas và chưa bao giờ thất vọng. Sản phẩm chất lượng, giá hợp lí và dịch vụ chăm sóc khách hàng rất tốt</p>
                        </div>
                    </div>
                </div>
            </div>
                <button class = "btnRight"><i class="fa-solid fa-circle-arrow-right" style="color: rgb(0, 0, 0);"></i></button>
        </div>
        </section>

        <section class = "reputation">
           <div class = "reputation_content">
                <div><i class="fa-regular fa-star"></i></div>
                <div class = "content_text">
                    <p>50+</p>
                    <p>THƯƠNG HIỆU HÀNG ĐẦU</p>
            
                </div>

           </div>

           <div class = "reputation_content">
                <div><i class="fa-solid fa-shield-halved"></i></div>
                <div class = "content_text">
                    <p>100%</p>
                    <p>CHÍNH HÃNG TOÀN CẦU</p>
            
                </div>

           </div>

           <div class = "reputation_content">
                <div><i class="fa-solid fa-repeat"></i></i></div>
                <div class = "content_text">
                    <p>7 NGÀY</p>
                    <p>ĐỔI TRẢ LINH HOẠT</p>
            
                </div>

            </div>

            <div class = "reputation_content">
                <div><i class="fa-solid fa-heart"></i></div>
                <div class = "content_text">
                    <p>10.000+</p>
                    <p>KHÁCH HÀNG TIN TƯỞNG</p>
            
                </div>

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