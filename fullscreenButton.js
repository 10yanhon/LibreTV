(function () {
  let btn = null;

  function isValidFullscreenLandscape() {
    return (
      document.fullscreenElement &&
      window.innerWidth > window.innerHeight
    );
  }

  function createButton() {
    if (btn) return; // 避免重复创建

    btn = document.createElement("button");
    btn.id = "fullscreenBtn";
    btn.textContent = "⛶";
    btn.title = "铺满全屏";

    Object.assign(btn.style, {
      position: "fixed",
      top: "10px",
      right: "10px",
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

    btn.addEventListener("click", () => {
      alert("点击了铺满全屏按钮");
      // 在此加入你的扩展全屏代码
    });

    document.body.appendChild(btn);
  }

  function removeButton() {
    if (btn) {
      btn.remove();
      btn = null;
    }
  }

  function checkAndToggleButton() {
    if (isValidFullscreenLandscape()) {
      createButton();
    } else {
      removeButton();
    }
  }

  document.addEventListener("fullscreenchange", () => {
    // 延迟 100ms，确保 fullscreen 状态稳定
    setTimeout(checkAndToggleButton, 100);
  });

  window.addEventListener("resize", () => {
    // 当屏幕宽高变化（可能是用户退出横屏）时重新判断
    setTimeout(checkAndToggleButton, 100);
  });

  window.addEventListener("DOMContentLoaded", () => {
    removeButton(); // 页面加载时清除残留
  });
})();
