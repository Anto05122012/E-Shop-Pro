const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

if (currentUser) {
  const navbarAvatar = document.getElementById("navbar-avatar");

  if (navbarAvatar) {
    navbarAvatar.src = currentUser.photoURL || "./img/default-avatar.png";
  
    const googleBadge = document.getElementById("google-badge");
    if (googleBadge) {
      googleBadge.style.display = currentUser.provider === "google" ? "block" : "none";
    }
  
    navbarAvatar.style.display = "inline-block";
    navbarAvatar.style.cursor = "pointer";
  
    navbarAvatar.addEventListener("click", () => {
      showUserProfilePopup();
    });
  }
  
}

function showUserProfilePopup() {
  const existing = document.getElementById("user-profile-popup");
  if (existing) existing.remove();

  const popup = document.createElement("div");
  popup.id = "user-profile-popup";
  popup.style.position = "absolute";
  popup.style.top = "60px";
  popup.style.right = "10px";
  popup.style.background = "#111";
  popup.style.padding = "20px";
  popup.style.borderRadius = "12px";
  popup.style.boxShadow = "0 10px 24px rgba(255,255,255,0.08)";
  popup.style.zIndex = "9999";
  popup.style.width = "300px";
  popup.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif";
  popup.style.color = "#fff";
  popup.style.animation = "fadeIn 0.3s ease forwards";

  const isGoogleAccount = currentUser.provider === "google";

  popup.innerHTML = `
    <div class="popup-content" style="text-align:center;">
      <img src="${currentUser.photoURL || './img/default-avatar.png'}" class="popup-avatar">
      <input type="file" id="upload-avatar" hidden>
      ${!isGoogleAccount ? `<label for="upload-avatar" class="popup-label">Đổi ảnh đại diện</label>` : ""}
      ${isGoogleAccount
        ? `<div style="font-size:14px; margin-bottom:12px; color:#888;">${currentUser.displayName}</div>`
        : `<input id="edit-name" class="popup-input" value="${currentUser.displayName || currentUser.email}">`}
      ${!isGoogleAccount
        ? `<button id="save-profile" class="popup-btn">Lưu thay đổi</button>`
        : ""}
      <button id="logout-btn" class="popup-btn logout" style="margin-top:10px; background:#333; color:#fff;">Đăng xuất</button>
    </div>
  `;

  const navbar = document.querySelector(".navbar") || document.body;
  navbar.appendChild(popup);

  if (!isGoogleAccount) {
    document.getElementById("upload-avatar").addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (event) {
        currentUser.photoURL = event.target.result;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        location.reload();
      };
      reader.readAsDataURL(file);
    });

    document.getElementById("save-profile").addEventListener("click", () => {
      const newName = document.getElementById("edit-name").value.trim();
      if (newName) {
        currentUser.displayName = newName;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        location.reload();
      }
    });
  }

  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("loginTime");
    window.location.href = "./login.html";
  });

  document.addEventListener("click", function closePopup(e) {
    if (!popup.contains(e.target) && e.target.id !== "navbar-avatar") {
      popup.style.animation = "fadeOut 0.25s ease forwards";
      setTimeout(() => popup.remove(), 250);
      document.removeEventListener("click", closePopup);
    }
  });
}

// Add style
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeOut {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-10px); }
}

.popup-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 12px;
  border: none !important;
}

.popup-label {
  display: block;
  cursor: pointer;
  color: #ccc;
  margin-bottom: 16px;
  font-weight: 600;
  font-size: 14px;
  transition: color 0.2s;
}

.popup-label:hover {
  color: #fff;
  text-decoration: underline;
}

.popup-input {
  width: 100%;
  padding: 10px 12px;
  border: none;
  background: #1a1a1a;
  color: white;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 14px;
  outline: none;
}

.popup-btn {
  width: 100%;
  padding: 12px 0;
  background: white;
  color: black;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;
}

.popup-btn:hover {
  background: #dcdcdc;
}

.popup-btn.logout:hover {
  background: #555;
}

.user-avatar-container {
  position: fixed;
  top: 12px;
  right: 20px;
  z-index: 10000;
}

.user-avatar-container img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s ease;
  border: none !important;
}

.user-avatar-container img:hover {
  transform: scale(1.05);
}
`;
document.head.appendChild(style);
