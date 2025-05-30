(function () {
  let button = null;

  function isLandscape() {
    return window.innerWidth > window.innerHeight;
  }

  function isInFullscreen() {
    return !!document.fullscreenElement;
  }

  function createButton() {
    if (button || !isInFullscreen() || !isLandscape()) return;

    button = document.createElement("button");
    button.id = "fullscreenBtn";
    button.textContent = "⛶";
    button.title = "铺满全屏";
    Object.assign(button.style, {
      position: "fixed",
      top: "10px",
      right: "50%",
      transform: "translateX(50%)",
      zIndex: "9999",
      background: "#222",
      color: "#fff",
      border: "1px solid #444",
      borderRadius: "6px",
      padding: "6px 10px",
      fontSize: "16px",
      cursor: "pointer",
      opacity: "0.85"
    });

    button.onclick = () => {
      alert("按钮已点击");
      // 发送消息给父页面或做全屏逻辑
      window.parent.postMessage({ type: "expandFullscreen" }, "*");
    };

    document.body.appendChild(button);
  }

  function removeButton() {
    if (button) {
      button.remove();
      button = null;
    }
  }

  function checkState() {
    if (isInFullscreen() && isLandscape()) {
      createButton();
    } else {
      removeButton();
    }
  }

  // 监听 fullscreen 进入/退出
  document.addEventListener("fullscreenchange", () => {
    setTimeout(checkState, 300);
  });

  // 监听窗口 resize（用户旋转手机或手动退出）
  window.addEventListener("resize", () => {
    setTimeout(checkState, 300);
  });

  // 初始尝试（有些浏览器可能直接在 fullscreen 打开页面）
  window.addEventListener("load", () => {
    setTimeout(checkState, 300);
  });
})();
