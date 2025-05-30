(function() {
  // 判断是否横屏
  function isLandscape() {
    return window.innerWidth > window.innerHeight;
  }

  // 创建铺满全屏按钮
  function createFullscreenButton() {
    if (document.getElementById("fullscreenBtn")) return;

    const btn = document.createElement("button");
    btn.id = "fullscreenBtn";
    btn.textContent = "⛶";
    btn.title = "铺满全屏";

    Object.assign(btn.style, {
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

    btn.addEventListener("click", () => {
      alert("按钮已点击");
      // 给父窗口发送铺满请求
      window.parent.postMessage({ type: "expandFullscreen" }, "*");
    });

    document.body.appendChild(btn);
  }

  // 移除按钮
  function removeFullscreenButton() {
    const btn = document.getElementById("fullscreenBtn");
    if (btn) btn.remove();
  }

  // 监听来自父页面的横屏状态通知
  window.addEventListener("message", (event) => {
    const data = event.data;
    if (data && data.type === "orientationChange") {
      if (data.landscape) {
        createFullscreenButton();
      } else {
        removeFullscreenButton();
      }
    }
  });

  // 页面加载时，主动通知父页面当前横竖屏状态（确保横屏时按钮出现）
  function notifyOrientation() {
    const landscape = isLandscape();
    window.parent.postMessage({ type: "orientationChange", landscape }, "*");
  }
  window.addEventListener("DOMContentLoaded", notifyOrientation);
  window.addEventListener("resize", () => setTimeout(notifyOrientation, 300));
})();
