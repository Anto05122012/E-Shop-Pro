
// Lấy dữ liệu giỏ hàng và hiển thị
const user = JSON.parse(localStorage.getItem("currentUser"));
const cartKey = user ? `cart_${user.email}` : null;
const orderKey = user ? `orders_${user.email}` : null;
const cart = cartKey ? JSON.parse(localStorage.getItem(cartKey)) || [] : [];

const summaryList = document.getElementById("order-summary");
let total = 0;

if (cart.length) {
  summaryList.innerHTML = "";
  cart.forEach(item => {
    const price = parseInt(item.price.replace(/\D/g, ""));
    const subtotal = price * item.quantity;
    total += subtotal;

    const li = document.createElement("li");
    li.textContent = `${item.name} x ${item.quantity} - ${subtotal.toLocaleString()}đ`;
    summaryList.appendChild(li);
  });

  const liTotal = document.createElement("li");
  liTotal.innerHTML = `<strong>Tổng: ${total.toLocaleString()}đ</strong>`;
  summaryList.appendChild(liTotal);
} else {
  summaryList.innerHTML = "<li><em>Không có sản phẩm nào trong giỏ hàng.</em></li>";
}

// Xử lý form và nút
const form = document.getElementById("checkout-form");
const inputs = form.querySelectorAll("input[required], textarea[required]");
const submitBtn = form.querySelector('button[type="submit"]');
const popup = document.getElementById("popup");
const closePopup = document.getElementById("close-popup");

// Loader xoay
const loadingOverlay = document.createElement("div");
loadingOverlay.style.position = "fixed";
loadingOverlay.style.top = 0;
loadingOverlay.style.left = 0;
loadingOverlay.style.width = "100vw";
loadingOverlay.style.height = "100vh";
loadingOverlay.style.background = "rgba(0,0,0,0.7)";
loadingOverlay.style.zIndex = "9999";
loadingOverlay.style.display = "flex";
loadingOverlay.style.alignItems = "center";
loadingOverlay.style.justifyContent = "center";
loadingOverlay.innerHTML = '<div class="spinner" style="width:40px;height:40px;border:5px solid #fff;border-top:5px solid transparent;border-radius:50%;animation:spin 1s linear infinite;"></div>';

const spinnerStyle = document.createElement("style");
spinnerStyle.innerHTML = "@keyframes spin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}";
document.head.appendChild(spinnerStyle);

// Bật tắt nút đặt hàng
function checkValidity() {
  let allFilled = true;
  inputs.forEach(input => {
    if (!input.value.trim()) allFilled = false;
  });

  const paymentSelected = form.querySelector('input[name="payment"]:checked');
  if (!paymentSelected) allFilled = false;

  submitBtn.disabled = !allFilled;
  submitBtn.style.opacity = allFilled ? 1 : 0.4;
  submitBtn.style.cursor = allFilled ? "pointer" : "not-allowed";
}

form.addEventListener("input", checkValidity);
form.addEventListener("change", checkValidity);
window.addEventListener("DOMContentLoaded", checkValidity);

// Khi đặt hàng
form.addEventListener("submit", function (e) {
  e.preventDefault();

  document.body.appendChild(loadingOverlay);

  setTimeout(() => {
    document.body.removeChild(loadingOverlay);

    if (cartKey && orderKey) {
      const orders = JSON.parse(localStorage.getItem(orderKey)) || [];

      const newOrder = {
        time: Date.now(),
        items: cart.map(item => {
          const price = parseInt(item.price.replace(/\D/g, ""));
          return {
            name: item.name,
            quantity: item.quantity,
            subtotal: price * item.quantity
          };
        }),
        total
      };

      orders.push(newOrder);
      localStorage.setItem(orderKey, JSON.stringify(orders));
      localStorage.removeItem(cartKey);
    }

    popup.style.display = "flex";

    setTimeout(() => {
      window.location.href = "index.html";
    }, 3000);
  }, 1500);
});

// Đóng popup
closePopup.addEventListener("click", function () {
  popup.style.display = "none";
});
