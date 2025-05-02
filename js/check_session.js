const user = JSON.parse(localStorage.getItem("currentUser"));

if (!user) {
    // Nếu chưa đăng nhập, cho phép vào trang giới thiệu, còn lại thì chặn
    if (!window.location.pathname.includes("gioi-thieu.html") && !window.location.pathname.includes("login.html")) {
        window.location.href = "./gioi-thieu.html";
    }
} else {
    // Nếu đã đăng nhập mà vẫn ở trang login/gioi-thieu thì chuyển vào index
    if (
        window.location.pathname.includes("gioi-thieu.html") ||
        window.location.pathname.includes("login.html")
    ) {
        window.location.href = "./index.html";
    }
}
