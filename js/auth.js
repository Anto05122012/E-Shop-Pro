import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } 
from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { auth } from "./firebase-config";

document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const googleBtn = document.getElementById("google-login-btn");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = loginForm.email.value;
        const password = loginForm.password.value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("Đăng nhập thành công!");
                console.log(userCredential.user);
                // Redirect hoặc lưu localStorage tại đây
            })
            .catch((error) => {
                alert("Đăng nhập thất bại: " + error.message);
            });
    });

    googleBtn.addEventListener("click", () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                alert("Đăng nhập Google thành công!");
                console.log(result.user);
            })
            .catch((error) => {
                alert("Lỗi đăng nhập Google: " + error.message);
            });
    });
});
