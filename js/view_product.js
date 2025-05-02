// Lấy category từ URL (?category=ao)

if (typeof productData === "undefined") {
  alert("Không tìm thấy dữ liệu sản phẩm (productData). Kiểm tra file product.js!");
}

const urlParams = new URLSearchParams(window.location.search);
const selectedCategory = urlParams.get("category");

const productList = document.getElementById("product-list");

function renderProductsByCategory(category) {
  const filtered = category === "all"
    ? productData
    : productData.filter(p => p.category === category);

  if (!filtered.length) {
    productList.innerHTML = `<p>Không có sản phẩm nào trong danh mục này.</p>`;
    return;
  }

  productList.innerHTML = filtered.map(p => `
    <div class="card fade-in">
      <img src="${p.image}" alt="${p.name}" />
      <div class="card-body">
        <h3 class="card-title">${p.name}</h3>
        <p>${p.price}</p>
        <a href="product-detail.html?id=${p.id}" class="btn">Xem chi tiết</a>
      </div>
    </div>
  `).join("");
}

renderProductsByCategory(selectedCategory || "all");
