document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("add-to-cart");
  const quantityInput = document.getElementById("product-quantity");

  addBtn?.addEventListener("click", () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return alert("Vui lòng đăng nhập!");

    const id = new URLSearchParams(window.location.search).get("id");
    const product = productData.find(p => p.id === id);
    if (!product) return;

    const quantity = parseInt(quantityInput?.value || "1");
    const cartKey = `cart_${currentUser.email}`;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const existing = cart.find(item => item.id === id);
    if (existing) existing.quantity += quantity;
    else cart.push({ ...product, quantity });

    localStorage.setItem(cartKey, JSON.stringify(cart));

    // Hiệu ứng
    addBtn.innerText = "✅ Đã thêm!";
    addBtn.disabled = true;
    setTimeout(() => {
      addBtn.innerText = "Thêm vào giỏ";
      addBtn.disabled = false;
    }, 1500);
  });
});
