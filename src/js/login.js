const usernameInput        = document.getElementById('username');
const passwordInput         = document.getElementById('password');
const loginBtn             = document.querySelector('.confirmBtn');

loginBtn.addEventListener('click', function(){
   
    const getUsers = localStorage.getItem('userList');
    const users = JSON.parse(getUsers) || [];
    const username   = usernameInput.value.trim();
    const password   = passwordInput.value.trim();
  
    if(username == "" || password == ""){
        alert("Nhập đầy đủ thông tin!")
        return;
    }

    const userFound = users.find(user => user.username == username);
   

    if(!userFound){
        alert("Tài khoản không tồn tại!");
        return;
    }

    if(userFound.userPassword !== password){
        alert("Sai mật khẩu!");
        return;
    }
    
     const userActive = {
        username: username,
        userWallet: userFound.userWallet,
        state: 'active'
    }

    localStorage.setItem('userActive', JSON.stringify(userActive));

    window.location.href = "/index.html";
    alert("Đăng nhập thành công!");
})

