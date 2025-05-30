(function () {
  let panel = null;

  const createButton = () => {
    // 如果已经创建，跳过
    if (panel) return;

    panel = document.createElement('div');
    panel.id = 'fullscreenControlPanel';
    panel.style.cssText = `
      display: none;
      position: fixed;
      top: 10px;
      right: 10px;
      z-index: 9999;
    `;

    const button = document.createElement('button');
    button.id = 'fullscreenBtn';
    button.textContent = '⛶';
    button.style.cssText = `
      background: #222;
      color: #fff;
      border: 1px solid #444;
      border-radius: 6px;
      padding: 6px 10px;
      font-size: 16px;
      cursor: pointer;
      opacity: 0.85;
    `;

    button.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    });

    panel.appendChild(button);
    document.body.appendChild(panel);
  };

  const handleFullscreenChange = () => {
    const isFullscreen = !!document.fullscreenElement;
    const isLandscape = window.matchMedia("(orientation: landscape)").matches;

    if (isFullscreen && isLandscape) {
      if (!panel) createButton(); // ⚠️ 只在进入全屏横屏时才创建
      panel.style.display = 'block';
    } else {
      if (panel) panel.style.display = 'none';
    }
  };

  // 监听仅全屏状态变化（不在 DOMContentLoaded 中执行）
  document.addEventListener('fullscreenchange', handleFullscreenChange);
  window.addEventListener('orientationchange', () => {
    setTimeout(handleFullscreenChange, 300);
  });
})();
