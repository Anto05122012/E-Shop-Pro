
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
const detailContainer = document.getElementById("product-detail");

function renderProductDetail(id) {
  if (!id) {
    detailContainer.innerHTML = "<p>Không tìm thấy sản phẩm (thiếu ID).</p>";
    return;
  }

  const product = productData.find(p => p.id === id);
  if (!product) {
setTimeout(() => {
    const addBtn = document.getElementById("add-to-cart-btn");
    const quantityInput = document.getElementById("product-quantity");

    addBtn?.addEventListener("click", () => {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (!currentUser || !currentUser.email) {
        alert("Bạn cần đăng nhập để thêm vào giỏ hàng!");
        return;
      }

      const uid = currentUser.email;
      const quantity = parseInt(quantityInput?.value || "1");

      const cartKey = `cart_${uid}`;
      const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

      const existing = cart.find(p => p.id === productId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({ ...product, quantity });
      }

      localStorage.setItem(cartKey, JSON.stringify(cart));
      alert("✅ Đã thêm vào giỏ!");
    });
  }, 0);    detailContainer.innerHTML = "<p>Không tìm thấy sản phẩm.</p>";
    return;
  }

  detailContainer.innerHTML = `
    <div class="product-detail">
      <img src="${product.image}" alt="${product.name}" />
      <div class="info">
        <h2>${product.name}</h2>
        <p><strong>Giá:</strong> ${product.price}</p>
        <p>${product.description}</p>

        <div style="margin-top: 16px; display: flex; align-items: center; gap: 12px;">
          <input id="product-quantity" type="number" min="1" value="1" style="width: 60px; padding: 8px;">
          <button id="add-to-cart-btn" style="padding: 8px 16px;">🛒 Thêm vào giỏ</button>
        </div>
        <div id="cart-toast" style="display:none; color: green; margin-top: 12px;">✅ Đã thêm vào giỏ!</div>
      </div>
    </div>
  `;

    }

    cart[uid] = userCart;
    localStorage.setItem("cart", JSON.stringify(cart));

    const toast = document.getElementById("cart-toast");
    toast.style.display = "block";
    setTimeout(() => {
      toast.style.display = "none";
    }, 1500);
  });
}

renderProductDetail(productId);
