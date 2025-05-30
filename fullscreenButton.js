(function () {
  let btn = null;

  function isLandscape() {
    // 优先使用 Screen Orientation API 判断方向
    if (screen.orientation && screen.orientation.type) {
      return screen.orientation.type.startsWith("landscape");
    }
    // 回退方案
    return window.innerWidth > window.innerHeight;
  }

  function createFullscreenButton() {
    if (btn) return; // 防止重复创建

    btn = document.createElement("button");
    btn.id = "fullscreenBtn";
    btn.textContent = "⛶";
    btn.title = "铺满全屏";
    Object.assign(btn.style, {
      position: "fixed",
      top: "10px",
      right: "10px",
      zIndex: 9999,
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
      alert("⛶ 铺满全屏按钮已点击");
      // 示例：你可替换成 postMessage 或其它全屏扩展逻辑
    });

    document.body.appendChild(btn);
  }

  function removeFullscreenButton() {
    if (btn) {
      btn.remove();
      btn = null;
    }
  }

  document.addEventListener("fullscreenchange", () => {
    const isFullscreen = !!document.fullscreenElement;

    if (isFullscreen && isLandscape()) {
      createFullscreenButton();
    } else {
      removeFullscreenButton();
    }
  });
})();
