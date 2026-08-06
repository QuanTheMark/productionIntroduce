const usernameInput        = document.getElementById('username');
const passwordInput         = document.getElementById('password');
const loginBtn             = document.querySelector('.confirmBtn');

loginBtn.addEventListener('click', function(event){
    event.preventDefault();
    const getUsers = localStorage.getItem('userList');
    const users = JSON.parse(getUsers);
    const username   = usernameInput.value.trim();
    const password   = passwordInput.value.trim();

    if(username == "" || password == ""){
        alert("Nhập đầy đủ thông tin!")
        return;
    }

    const userFound = users.find(user => user.username == username);
    const userPasswordFound = users.find(userPassword => userPassword.userPassword == password)

    if(!userFound){
        alert("Tài khoản không tồn tại!");
        return;
    }

    if(!userPasswordFound){
        alert("Sai mật khẩu!");
        return;
    }
    
     const userActive = {
        username: username,
        state: 'active'
    }

    localStorage.setItem('userActive', JSON.stringify(userActive));
    alert("Đang đăng nhập.....");
    setTimeout(() => {
        window.location.href = "/index.html";
    }, 1500);

    alert("Đăng nhập thành công!");
})

