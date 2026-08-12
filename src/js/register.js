const usernameInput         = document.getElementById('username');
const emailInput            = document.getElementById('email');
const passwordInput         = document.getElementById('password');
const confirmPasswordInput  = document.getElementById('confirmPassword');


const registerBtn = document.querySelector('.confirmBtn');

registerBtn.addEventListener('click', function(){

    let userList = JSON.parse(localStorage.getItem('userList')) || [] ;
    const username          = usernameInput.value.trim();
    const email             = emailInput.value.trim();
    const password          = passwordInput.value.trim();
    const confirmPassword   = confirmPasswordInput.value.trim();
    const usernamePattern   = /^[a-zA-Z0-9]*$/;
    

    if(username == "" || password == "" || email == "" || confirmPassword == ""){
        usernameInput.style.border = "var(--danger-color) 2px solid";
        emailInput.style.border = "var(--danger-color) 2px solid";
        passwordInput.style.border = "var(--danger-color) 2px solid";
        confirmPasswordInput.style.border = "var(--danger-color) 2px solid";
        alert("Vui lòng nhập đầy đủ thông tin!")
        return;
    }

    const userFound = userList.find(user => user.username == username);
    const userEmailFound = userList.find(userEmail => userEmail.userEmail == email);
    if(userFound){
        alert("Tài khoản đã tồn tại")
        usernameInput.style.border = "var(--danger-color) 2px solid";
        return;
    }

    
    if(!usernamePattern.test(username)){
        alert("Tên người dùng phải bắt đầu bằng chữ và không chứa kí tự đặc biệt");
        usernameInput.style.border = "var(--danger-color) 2px solid";
        return;
    }


    if(userEmailFound){
        emailInput.style.border = "var(--danger-color) 2px solid";
        alert("Email này đã tồn tại rồi!")
        return;
    }

    if(password.length < 6){
        alert("Yêu cầu mật khẩu phải từ 6 kí từ trở lên!")
        passwordInput.style.border = "var(--danger-color) 2px solid";
        return;
    }

    if(password != confirmPassword){
        alert("Mật khẩu không khớp!");
        confirmPasswordInput.style.border = "var(--danger-color) 2px solid";
        return;
    }

    const user = {
        username: username,
        userEmail: email,
        userPassword: password,
        userWallet: 0
        }

    userList.push(user);

    localStorage.setItem( 'userList' , JSON.stringify(userList));

    const userActive = {
        username: username,
        userWallet: 0,
        state: 'active'
    }

    localStorage.setItem('userActive', JSON.stringify(userActive));
    window.location.href = "/index.html";
    alert("Đăng ký thành công!")

})
