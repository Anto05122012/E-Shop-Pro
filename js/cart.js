document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  loader.style.display = "block";

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const cartKey = `cart_${currentUser?.email}`;
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  const container = document.getElementById("cart-container");

  setTimeout(() => {
    loader.style.display = "none";

    if (!currentUser) return container.innerHTML = "<p>Vui lòng đăng nhập để xem giỏ hàng.</p>";
    if (!cart.length) return container.innerHTML = "<p>Không có sản phẩm nào trong giỏ.</p>";

    let total = 0;
    container.innerHTML = cart.map((item, index) => {
      const price = parseInt(item.price.replace(/\D/g, ""));
      const subtotal = price * item.quantity;
      total += subtotal;

      return `
        <div class="cart-item" data-index="${index}">
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-info">
            <h3>${item.name}</h3>
            <p>Giá: ${item.price}</p>
            <div class="quantity-edit">
              <input type="number" class="quantity-input" value="${item.quantity}" min="1">
              <button class="update-btn">Sửa</button>
              <button class="delete-btn">Xóa</button>
            </div>
            <p><strong>${subtotal.toLocaleString()}đ</strong></p>
          </div>
        </div>
      `;
    }).join("") + `<div class="cart-total">Tổng cộng: <strong>${total.toLocaleString()}đ</strong></div>`;
  }, 500); // Giả delay cho đẹp
});


// Xử lý nút Sửa và Xóa
document.addEventListener("click", (e) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const cartKey = `cart_${currentUser?.email}`;
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  if (e.target.classList.contains("delete-btn")) {
    const index = e.target.closest(".cart-item").dataset.index;
    cart.splice(index, 1);
    localStorage.setItem(cartKey, JSON.stringify(cart));
    location.reload();
  }

  if (e.target.classList.contains("update-btn")) {
    const itemDiv = e.target.closest(".cart-item");
    const index = itemDiv.dataset.index;
    const newQty = parseInt(itemDiv.querySelector(".quantity-input").value);

    if (newQty >= 1) {
      cart[index].quantity = newQty;
      localStorage.setItem(cartKey, JSON.stringify(cart));
      location.reload();
    }
  }
});
