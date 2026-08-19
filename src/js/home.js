const start = document.querySelector(".explore_btnExplore");
const main = document.querySelector("#main");
const footer = document.querySelector("#footer");
footer.style.display = "none";
start.addEventListener("click", function () {
  footer.style.display = "block";
  main.innerHTML = `
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

            <div class = "referentialProduction"></div>
        </section>
        <section class = "productionReview">
            <div class = "productionReview_text">
                <h2>ĐÁNH GIÁ THỰC TẾ</h2>
                <p>Sự hài lòng của bạn là động lực để Abydas phát triển mỗi ngày.</p>
            </div>

           
                 
         
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


        `;

  footer.innerHTML = `
        <div class = "footer">
           <div class = "logo">
                    <div class ="logo_image"></div>
                    <h2>Abydas</h2>
                </div>

                <div>
                    <p>Copyright &copy; 2026 <b>Abydas</b>. All rights reserved.</p>
                </div>

                <div class ="term">
                    <a href="/privatePolicy.html">Chính sách bảo mật</a>
                    <div></div>
                    <a href="/terms.html">Điều khoản sử dụng</a>
            </div>
        </div>
        `;
  if (main) {
    main.scrollIntoView({
      behavior: "smooth",
    });
  }

  function formatPrice(price) {
    return (price || 0).toLocaleString("vi-VN") + " VNĐ";
  }

  async function fetchProducts() {
    const response = await fetch("/products.json");
    if (!response.ok) {
      throw new Error("Không thể tải dữ liệu sản phẩm.");
    }
    const data = await response.json();
    return Array.isArray(data) ? data : data.products || [];
  }

  async function renderProducts() {
    const referentialProduction = document.querySelector(
      ".referentialProduction",
    );
    if (!referentialProduction) return;

    const products = await fetchProducts();
    const limitedProducts = products.slice(0, 3);

    // 1. Tạo chuỗi HTML tích lũy cho toàn bộ sản phẩm
    let referentialProductionContent = "";
    limitedProducts.forEach((product) => {
      referentialProductionContent += `
                <div class="referentialProduction_container" style="background-image: url('${product.image?.thumbnail || ""}')">
                     <div class="container_information">
                        <div class="title"><h2>${product.name}</h2></div>
                        <div class="price"><h3>${formatPrice(product.price)}</h3></div>
                        <button class="containerBtn btn-customs" data-product-id="${product.id}">Xem chi tiết</button>
                    </div>
                </div>
            `;
    });

    // 2. Chèn toàn bộ danh sách vào DOM một lần duy nhất
    referentialProduction.innerHTML = referentialProductionContent;

    // 3. Ủy quyền sự kiện: Chỉ lắng nghe duy nhất tại thẻ cha referentialProduction
    referentialProduction.addEventListener("click", (event) => {
      // Tìm xem phần tử được click có phải là nút containerBtn hay không
      const btn = event.target.closest(".containerBtn");

      if (btn) {
        // Lấy ID sản phẩm trực tiếp từ thuộc tính dữ liệu của nút đó
        const productId = btn.dataset.productId;
        window.location.href = `/productionDetail.html?id=${encodeURIComponent(productId)}`;
      }
    });
  }

  // Gọi hàm để thực thi
  renderProducts();
});
