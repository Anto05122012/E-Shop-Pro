// Dữ liệu sản phẩm
const productData = [
  {
    id: "sp001",
    name: "Áo Thun Nam Basic",
    category: "ao",
    price: "199.000đ",
    image: "img/sp001.png",
    description: "Áo thun nam form rộng, chất vải cotton co giãn."
  },
  {
    id: "sp002",
    name: "Giày Sneakers Trắng",
    category: "giay",
    price: "599.000đ",
    image: "img/sp002.png",
    description: "Giày thể thao phong cách trẻ trung, dễ phối đồ."
  },
  {
    id: "sp003",
    name: "Tai Nghe Bluetooth",
    category: "dien-tu",
    price: "299.000đ",
    image: "img/sp003.png",
    description: "Tai nghe không dây âm thanh sống động."
  },
  {
    id: "sp004",
    name: "Laptop Acer Aspire",
    category: "may-tinh",
    price: "12.990.000đ",
    image: "img/sp004.png",
    description: "Laptop học tập - văn phòng cấu hình ổn định."
  },
  {
    id: "sp005",
    name: "Máy Ảnh Canon EOS",
    category: "may-anh",
    price: "8.490.000đ",
    image: "img/sp005.png",
    description: "Máy ảnh chuyên nghiệp cho người mới bắt đầu."
  },
  {
    id: "sp006",
    name: "Đồng Hồ Nam Dây Kim Loại",
    category: "dong-ho",
    price: "1.390.000đ",
    image: "img/sp006.png",
    description: "Thiết kế sang trọng, lịch lãm, chống nước tốt."
  },
  {
    id: "sp007",
    name: "Nồi Chiên Không Dầu",
    category: "gia-dung",
    price: "1.790.000đ",
    image: "img/sp007.png",
    description: "Tiện lợi, giữ nguyên hương vị món ăn."
  },
  {
    id: "sp008",
    name: "Bóng Đá Size 5",
    category: "the-thao",
    price: "299.000đ",
    image: "img/sp008.png",
    description: "Bóng đá chuẩn size 5, chất liệu da PU cao cấp."
  },
  {
    id: "sp009",
    name: "Xe Máy Honda Vision",
    category: "xe",
    price: "31.999.999đ",
    image: "img/sp009.png",
    description: "Xe tay ga tiết kiệm xăng, vận hành êm ái."
  },
  {
    id: "sp010",
    name: "Đầm Hoa Nhí Nữ",
    category: "thoi-trang-nu",
    price: "279.000đ",
    image: "img/sp010.png",
    description: "Đầm nữ dáng xòe, nhẹ nhàng, dễ thương."
  },
  {
    id: "sp011",
    name: "Bỉm Moony Nội Địa Nhật",
    category: "me-be",
    price: "429.000đ",
    image: "img/sp011.jpg",
    description: "Bỉm mềm mại, chống tràn cực tốt, size M."
  },
  {
    id: "sp012",
    name: "Ghế Sofa Mini",
    category: "nha-cua",
    price: "1.999.000đ",
    image: "img/sp012.png",
    description: "Ghế đơn nệm lông mịn, decor phòng khách."
  },
  {
    id: "sp013",
    name: "Bộ Trang Điểm Nội Địa Trung",
    category: "sac-dep",
    price: "499.000đ",
    image: "img/sp013.png",
    description: "Set son, phấn, highlight, mascara cho nàng xinh."
  }
];

// Lấy thông tin sản phẩm từ URL
// const urlParams = new URLSearchParams(window.location.search);
// const productId = urlParams.get("id");
const detailContainer = document.getElementById("product-detail");

// Hàm render chi tiết sản phẩm
function renderProductDetail(id) {
  const product = productData.find(p => p.id === id);

  if (!product) {
    detailContainer.innerHTML = `<p>Không tìm thấy sản phẩm.</p>`;
    return;
  }

  const categoryParam = product.category ? `?category=${product.category}` : "";

  detailContainer.innerHTML = `
    <a href="product-list.html${categoryParam}" class="btn" style="
      position: absolute;
      top: 20px;
      left: 20px;
      background: #eee;
      color: #000;
      padding: 10px 18px;
      border-radius: 8px;
      text-decoration: none;
      z-index: 1000;">
      ← Quay về danh mục
    </a>
    <div class="product-detail">
      <img src="${product.image}" alt="${product.name}" />
      <div class="info">
        <h2>${product.name}</h2>
        <p><strong>Giá:</strong> ${product.price}</p>
        <p>${product.description}</p>
        <button class="btn">Thêm vào giỏ</button>
      </div>
    </div>
  `;
}

// Gọi hàm để render chi tiết sản phẩm
if (productId) {
  renderProductDetail(productId);
} else {
  detailContainer.innerHTML = "<p>Không tìm thấy sản phẩm (thiếu ID).</p>";
}

// Kiểm tra nếu productData chưa có trong localStorage thì thêm vào
if (!localStorage.getItem("productData")) {
  localStorage.setItem("productData", JSON.stringify(productData));
}