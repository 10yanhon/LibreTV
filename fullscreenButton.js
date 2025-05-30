 // fullscreenButton.js

(function() {
  // 创建独立控制面板，默认隐藏
  const panel = document.createElement("div");
  panel.id = "fullscreenControlPanel";
  panel.style.cssText = `
    display: none;
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 9999;
  `;

  // 创建按钮
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

  // 点击后铺满整个屏幕区域
  btn.onclick = () => {
    const video = document.querySelector("video");
    if (video) {
      alert("铺满全屏触发");
      video.style.position = "fixed";
      video.style.top = "0";
      video.style.left = "0";
      video.style.width = "100vw";
      video.style.height = "100vh";
      video.style.zIndex = "9999";
      video.style.backgroundColor = "#000";
    }
  };

  panel.appendChild(btn);
  document.body.appendChild(panel);

  // 核心：监听 fullscreenchange，识别原放大按钮点击
  document.addEventListener("fullscreenchange", () => {
    const isFullscreen = !!document.fullscreenElement;
    const isLandscape = window.innerWidth > window.innerHeight;
    if (isFullscreen && isLandscape) {
      panel.style.display = "block"; // 只在横屏伪全屏显示按钮
    } else {
      panel.style.display = "none";
    }
  });
})();
