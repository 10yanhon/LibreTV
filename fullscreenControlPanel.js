(function () {
  let lastWidth = 0;
  let lastHeight = 0;
  let button = null;
  let isInserted = false;

  const CHECK_INTERVAL = 300; // 毫秒
  const TARGET_ASPECT_RATIO = 1.2; // 横屏时宽高比 > 1.2

  function insertButton(targetElement) {
    if (button) return;

    button = document.createElement('button');
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
    isInserted = true;
  }

  function removeButton() {
    if (button) {
      button.remove();
      button = null;
      isInserted = false;
    }
  }

  function startMonitor() {
    const video = document.querySelector('video');

    if (!video) return;

    setInterval(() => {
      const isFullscreen = !!document.fullscreenElement;
      const w = video.clientWidth;
      const h = video.clientHeight;

      const aspect = w / h;
      const significantChange = Math.abs(w - lastWidth) > 100 || Math.abs(h - lastHeight) > 100;

      lastWidth = w;
      lastHeight = h;

      if (isFullscreen && aspect > TARGET_ASPECT_RATIO && significantChange && !isInserted) {
        insertButton(document.fullscreenElement || video);
      }

      if ((!isFullscreen || aspect <= TARGET_ASPECT_RATIO) && isInserted) {
        removeButton();
      }
    }, CHECK_INTERVAL);
  }

  document.addEventListener('DOMContentLoaded', startMonitor);
})();
