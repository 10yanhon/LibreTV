(function () {
  const createButton = () => {
    // 避免重复插入
    if (document.getElementById('fullscreenBtn')) return;

    const panel = document.createElement('div');
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

    // 点击按钮切换网页全屏
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

  const updateButtonVisibility = () => {
    const isFullscreen = !!document.fullscreenElement;
    const isLandscape = window.matchMedia("(orientation: landscape)").matches;

    const panel = document.getElementById('fullscreenControlPanel');
    if (!panel) return;

    if (isFullscreen && isLandscape) {
      panel.style.display = 'block';
    } else {
      panel.style.display = 'none';
    }
  };

  // 初始化
  document.addEventListener('DOMContentLoaded', () => {
    createButton();
    updateButtonVisibility();
  });

  // 监听全屏变化
  document.addEventListener('fullscreenchange', updateButtonVisibility);
  // 监听横竖屏变化
  window.addEventListener('orientationchange', () => {
    setTimeout(updateButtonVisibility, 300);
  });
})();
