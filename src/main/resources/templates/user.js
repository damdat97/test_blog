let content = document.getElementById('content')
function showRegisterForm() {
    let str = `
        <input type="text" id="username" name="username" placeholder="Username">
         <input type="password" id="password" name="password" placeholder="Password">
         <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password">
         <button type="submit" onclick="register()">Register</button>
`
    content.innerHTML = str
}

function register() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    let data = {
        username: username,
        password: password,
        confirmPassword: confirmPassword
    }
    console.log(data)
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "POST",
        url: "http://localhost:8081/register",
        data: JSON.stringify(data),
        success: function () {
            alert("Register done!")
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function showLoginForm() {
    let str = `
       <input type="text" id="usernameLogin" name="username" placeholder="Username">
        <input type="password" id="passwordLogin" name="password" placeholder="Password">
        <button type="submit" onclick="loginUser()">Login</button>
`
    content.innerHTML = str
}

function loginUser() {
    let usernameLogin = document.getElementById('usernameLogin').value;
    let passwordLogin = document.getElementById('passwordLogin').value;
    let user = {
        username: usernameLogin,
        password: passwordLogin
    }
    console.log(user)
    $.ajax ({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "POST",
        url: "http://localhost:8081/login",
        data: JSON.stringify(user),
        success: function (data) {
            console.log(data)
            localStorage.setItem('token', data.accessToken)
            localStorage.setItem('id', data.id)
            write()
        },
        error: function (error) {
            document.write("Sai tai khoan or mat khau")
            console.log(error)
        }
    })
}

function write() {
    let str = `<button onclick="roleUser()">User</button>
    <button onclick="roleAdmin()">Admin</button>`
    content.innerHTML = str
}

function roleAdmin() {
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        type: "GET",
        url: "http://localhost:8081/admin/users",
        success: function (data) {
            console.log(data)
            writeUser(data)
        },
        error: function (error) {
            document.getElementById("content").innerHTML = `<h4>Bạn không có quyền ở đây<\h4>`
            console.log(error)
        }
    })
}

function roleUser() {
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        type: "GET",
        url: "http://localhost:8081/users",
        success: function (data) {
            console.log(data)
            writeUser(data)
            showBlogContent()
        },
        error: function (error) {
            document.getElementById("content").innerHTML = `<h4>Bạn không có quyền ở đây<\h4>`
            console.log(error)
        }
    })
}

function writeUser(data) {
    let str = ""
    for (let i = 0; i < data.length; i++) {
        str += `<h4>Id : ${data[i].id}, ${data[i].username} - Tôi là User<\h4>`
    }
    document.getElementById("content").innerHTML = str
}
