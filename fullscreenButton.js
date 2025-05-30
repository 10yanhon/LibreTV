(function () {
  // 创建按钮容器，初始隐藏
  const panel = document.createElement("div");
  panel.id = "fullscreenControlPanel";
  panel.style.cssText = `
    display: none;
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 9999;
  `;

  const btn = document.createElement("button");
  btn.id = "fullscreenBtn";
  btn.textContent = "⛶";
  btn.title = "铺满全屏";
  btn.style.cssText = `
    background: #222;
    color: #fff;
    border: 1px solid #444;
    border-radius: 6px;
    padding: 6px 10px;
    font-size: 16px;
    cursor: pointer;
    opacity: 0.85;
  `;

  btn.addEventListener("click", () => {
    alert("已点击铺满全屏按钮");
    // 这里可添加你控制播放器铺满逻辑
  });

  panel.appendChild(btn);
  document.body.appendChild(panel);

  // 判断是否是“手动进入 fullscreen 的横屏”
  function shouldShowButton() {
    const isLandscape = window.innerWidth > window.innerHeight;
    const inFullscreen =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement;

    return isLandscape && inFullscreen;
  }

  function updateButtonVisibility() {
    if (shouldShowButton()) {
      panel.style.display = "block";
    } else {
      panel.style.display = "none";
    }
  }

  // 监听 fullscreen 状态变化
  ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"].forEach(evt =>
    document.addEventListener(evt, updateButtonVisibility)
  );

  // 监听窗口大小变化（防止旋转后不更新）
  window.addEventListener("resize", () => {
    setTimeout(updateButtonVisibility, 300);
  });

  // 初始判断一次
  window.addEventListener("DOMContentLoaded", () => {
    setTimeout(updateButtonVisibility, 300);
  });
})();
