(function () {
  let panel, button;

  // 检查是否处于伪全屏横屏（点击原放大按钮 + 自动旋转关闭）
  function isPseudoFullscreenLandscape() {
    return (
      screen.orientation?.type?.startsWith("landscape") &&
      !window.matchMedia("(orientation: portrait)").matches &&
      !document.fullscreenElement &&
      window.innerWidth > window.innerHeight
    );
  }

  // 创建控制面板（只创建一次）
  function createFullscreenButton() {
    if (document.getElementById("fullscreenControlPanel")) return;

    panel = document.createElement("div");
    panel.id = "fullscreenControlPanel";
    Object.assign(panel.style, {
      display: "none",
      position: "fixed",
      top: "10px",
      right: "10px",
      zIndex: "9999"
    });

    button = document.createElement("button");
    button.id = "fullscreenBtn";
    button.innerText = "⛶";
    button.title = "铺满全屏";
    Object.assign(button.style, {
      background: "#222",
      color: "#fff",
      border: "1px solid #444",
      borderRadius: "6px",
      padding: "6px 10px",
      fontSize: "16px",
      cursor: "pointer",
      opacity: "0.85"
    });

    button.addEventListener("click", () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(console.error);
      } else {
        document.exitFullscreen().catch(console.error);
      }
    });

    panel.appendChild(button);
    document.body.appendChild(panel);
  }

  // 控制显示或隐藏按钮
  function updateButtonVisibility() {
    const panel = document.getElementById("fullscreenControlPanel");
    if (!panel) return;

    if (isPseudoFullscreenLandscape()) {
      panel.style.display = "block";
    } else {
      panel.style.display = "none";
    }
  }

  // 初始化
  window.addEventListener("DOMContentLoaded", () => {
    createFullscreenButton();
    updateButtonVisibility();
  });

  // 响应方向变化 / 尺寸变化
  window.addEventListener("resize", updateButtonVisibility);
  screen.orientation?.addEventListener("change", updateButtonVisibility);
})();
