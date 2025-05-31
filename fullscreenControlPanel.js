(function () {
  let hasInserted = false;
  let checkInterval = null;

  function createButton(targetElement) {
    if (document.getElementById('fill-toggle-button')) return;

    const button = document.createElement('button');
    button.id = 'fill-toggle-button';
    button.textContent = '铺满全屏';
    button.dataset.active = '0';

    Object.assign(button.style, {
      position: 'fixed',
      bottom: '10%',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 9999,
      fontSize: '16px',
      padding: '10px 20px',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      color: '#fff',
      cursor: 'pointer',
    });

    button.addEventListener('click', () => {
      const isActive = button.dataset.active === '1';
      if (isActive) {
        targetElement.style.width = '';
        targetElement.style.height = '';
        targetElement.style.objectFit = '';
        button.textContent = '铺满全屏';
        button.dataset.active = '0';
      } else {
        targetElement.style.width = '100vw';
        targetElement.style.height = '100vh';
        targetElement.style.objectFit = 'contain';
        button.textContent = '还原大小';
        button.dataset.active = '1';
      }
    });

    document.body.appendChild(button);
    hasInserted = true;
  }

  function removeButton() {
    const btn = document.getElementById('fill-toggle-button');
    if (btn) btn.remove();
    hasInserted = false;
  }

  function monitorFullscreen() {
    const fullscreenEl = document.fullscreenElement;
    if (!fullscreenEl) return;

    const w = fullscreenEl.offsetWidth;
    const h = fullscreenEl.offsetHeight;

    const isLikelyLandscape = w > h && (w / h > 1.3);

    if (isLikelyLandscape && !hasInserted) {
      createButton(fullscreenEl);
    }
  }

  document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
      // 启动定时检测（仅 fullscreen 状态）
      checkInterval = setInterval(monitorFullscreen, 300);
    } else {
      // 离开 fullscreen，清除按钮
      clearInterval(checkInterval);
      removeButton();
    }
  });
})();
