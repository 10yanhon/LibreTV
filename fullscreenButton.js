(function () {
  let btn = null;

  // 判断是否是“点击原放大按钮后”的 fullscreen 横屏状态
  function isManualFullscreenLandscape() {
    return (
      document.fullscreenElement && 
      screen.orientation?.type?.startsWith("landscape")
    );
  }

  function createButton() {
    if (btn) return; // 避免重复创建

    btn = document.createElement("button");
    btn.id = "fullscreenBtn";
    btn.textContent = "⛶";
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
      // 在这里执行你自己的铺满全屏逻辑
    });

    document.body.appendChild(btn);
  }

  function removeButton() {
    if (btn) {
      btn.remove();
      btn = null;
    }
  }

  function handleFullscreenChange() {
    if (isManualFullscreenLandscape()) {
      createButton();
    } else {
      removeButton();
    }
  }

  document.addEventListener("fullscreenchange", handleFullscreenChange);
  window.addEventListener("DOMContentLoaded", removeButton); // 页面加载先清理
})();
