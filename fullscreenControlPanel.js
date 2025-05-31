(function () {
  const CHECK_INTERVAL = 1000; // 检查间隔（1秒）
  const BUTTON_ID = 'fill-toggle-button';
  let lastState = 'none'; // 记录上一次状态

  const createButton = () => {
    if (document.getElementById(BUTTON_ID)) return;

    const button = document.createElement('button');
    button.id = BUTTON_ID;
    button.textContent = '铺满全屏';
    button.dataset.active = '0';

    Object.assign(button.style, {
      position: 'fixed',
      bottom: '12%',
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
      const video = document.querySelector('video');
      if (!video) return;

      if (isActive) {
        video.style.width = '';
        video.style.height = '';
        video.style.objectFit = '';
        button.textContent = '铺满全屏';
        button.dataset.active = '0';
      } else {
        video.style.width = '100vw';
        video.style.height = '100vh';
        video.style.objectFit = 'contain';
        button.textContent = '还原大小';
        button.dataset.active = '1';
      }
    });

    document.body.appendChild(button);
  };

  const removeButton = () => {
    const btn = document.getElementById(BUTTON_ID);
    if (btn) btn.remove();
  };

  // 轮询检测是否满足“横屏+全屏”的状态
  setInterval(() => {
    const video = document.querySelector('video');
    if (!video) return;

    const isFullscreen = !!document.fullscreenElement;
    const screenIsLandscape = window.innerWidth > window.innerHeight;

    // 控制逻辑：仅当横屏 + 全屏 + video 占据核心空间时才显示按钮
    if (isFullscreen && screenIsLandscape) {
      if (lastState !== 'showing') {
        createButton();
        lastState = 'showing';
      }
    } else {
      if (lastState !== 'hidden') {
        removeButton();
        lastState = 'hidden';
      }
    }
  }, CHECK_INTERVAL);
})();
