var nameIn = document.getElementById("nameIn");
var emailIn = document.getElementById("emailIn");
var passIn = document.getElementById("passIn");
var emailUp = document.getElementById("emailUp");
var passUp = document.getElementById("passUp");
var message = document.getElementById("message");
var messageUp = document.getElementById("messageUp");
var Welcome = document.querySelector(".second");

var infoArr = [];

if (localStorage.getItem("Bookmarks") != null) {
    infoArr = JSON.parse(localStorage.getItem("information"));
}

function getInfo() {
    if (ifEmailExist() == true) {
        message.innerHTML = `<span class="text-danger">Email Exist</span>`
    } else {
        if (validateInfo()) {
            message.innerHTML = `<span class="text-danger">Success Go to Sign in</span>`
            infoArr.push(infoObject());
            localStorage.setItem("information", JSON.stringify(infoArr))
            location.replace("SignIn.html");
            clear();
        } else {
            message.innerHTML = `<span class="text-danger">All inputs is required</span>`
            clear();
        }
    }
}

function ifEmailExist() {
    for (let i = 0; i < infoArr.length; i++) {
        if (infoArr[i].email.toLowerCase() == emailIn.value.toLowerCase()) {
            return true;
        }
    }
}

function infoObject() {
    return Info = {
        name: nameIn.value,
        email: emailIn.value,
        pass: passIn.value,
    }
}

function clear() {
    nameIn.value = "";
    emailIn.value = "";
    passIn.value = "";
}

function login() {
    if (validateLogin() == true) {
        location.replace("home.html");
    } else {
        messageUp.innerHTML = `<span class="text-danger">All inputs is required</span>`
    }
}

function atHome() {
    var userName = JSON.parse(localStorage.getItem("name"))
    document.getElementById("Welcome").innerHTML = `<h1>Welcome ${userName}</h1>`;
    showProduct();
}

function logOut() {
    location.replace("SignIn.html");
    localStorage.removeItem('name')
}
// !-----------------------------------------------------validation-----------------------------------------------------------------! //
function validateInfo() {
    return /^[\S\w]+$/.test(nameIn.value) &&
        /^[\S\w\._-]+@[a-zA-Z_-]+\.[a-z]{2,8}(\.[a-z]{2,8})?$/.test(emailIn.value) &&
        /^[\w\W\.-]+$/.test(passIn.value);
}

function validateLogin() {
    for (var i = 0; i < infoArr.length; i++) {
        if (infoArr[i].email.toLowerCase() == emailUp.value.toLowerCase() && infoArr[i].pass.toLowerCase() == passUp.value.toLowerCase()) {
            localStorage.setItem("name", JSON.stringify(infoArr[i].name))
            return true
        }
    }
}