document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const cartKey = `cart_${currentUser?.email}`;
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  const container = document.getElementById("cart-container");

  if (!currentUser) return container.innerHTML = "<p>Vui lòng đăng nhập để xem giỏ hàng.</p>";
  if (!cart.length) return container.innerHTML = "<p>Không có sản phẩm nào trong giỏ.</p>";

  let total = 0;
  container.innerHTML = cart.map(item => {
    const price = parseInt(item.price.replace(/\D/g, ""));
    const subtotal = price * item.quantity;
    total += subtotal;

    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="info">
          <h3>${item.name}</h3>
          <p>${item.price} x ${item.quantity}</p>
          <strong>${subtotal.toLocaleString()}đ</strong>
        </div>
      </div>
    `;
  }).join("") + `<div class="cart-total">Tổng cộng: <strong>${total.toLocaleString()}đ</strong></div>`;
});
