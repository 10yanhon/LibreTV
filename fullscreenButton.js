// fullscreenButton.js

(function () {
  const btnId = "fullscreenBtn";
  const panelId = "fullscreenControlPanel";

  // 创建控制面板和按钮
  function createButton() {
    if (document.getElementById(panelId)) return; // 避免重复创建

    const panel = document.createElement("div");
    panel.id = panelId;
    Object.assign(panel.style, {
      display: "none",
      position: "fixed",
      top: "10px",
      right: "10px",
      zIndex: 9999,
    });

    const btn = document.createElement("button");
    btn.id = btnId;
    btn.textContent = "⛶";
    btn.title = "铺满全屏";
    Object.assign(btn.style, {
      background: "#222",
      color: "#fff",
      border: "1px solid #444",
      borderRadius: "6px",
      padding: "6px 10px",
      fontSize: "16px",
      cursor: "pointer",
      opacity: "0.85",
    });

    btn.addEventListener("click", () => {
      alert("按钮已点击");
      // 可以发送 postMessage 或直接触发全屏逻辑
    });

    panel.appendChild(btn);
    document.body.appendChild(panel);
  }

  // 检查是否处于 fullscreen + 横屏模式
  function shouldShowButton() {
    const isFullscreen =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement;

    const isLandscape = window.innerWidth > window.innerHeight;

    return Boolean(isFullscreen && isLandscape);
  }

  // 控制按钮显示
  function updateButtonVisibility() {
    const panel = document.getElementById(panelId);
    if (!panel) return;
    panel.style.display = shouldShowButton() ? "block" : "none";
  }

  // 初始化逻辑
  function init() {
    createButton();
    updateButtonVisibility();
  }

  // 事件监听
  document.addEventListener("fullscreenchange", updateButtonVisibility);
  window.addEventListener("resize", updateButtonVisibility);
  window.addEventListener("orientationchange", updateButtonVisibility);

  window.addEventListener("DOMContentLoaded", () => {
    setTimeout(init, 300); // 延迟初始化，确保 DOM 就绪
  });
})();
