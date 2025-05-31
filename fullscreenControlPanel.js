(() => {
  const BUTTON_ID = 'fullscreen-pillar-button';
  let isPillarMode = false; // 是否铺满模式开启
  let button = null;
  let fullscreenElement = null;

  // 判断当前屏幕是否横屏（宽 > 高）
  function isLandscape() {
    return window.innerWidth > window.innerHeight;
  }

  // 创建铺满全屏按钮
  function createButton() {
    if (button) return;

    button = document.createElement('button');
    button.id = BUTTON_ID;
    button.textContent = '铺满全屏';
    Object.assign(button.style, {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      padding: '10px 16px',
      fontSize: '16px',
      zIndex: 999999,
      cursor: 'pointer',
      background: 'rgba(0,0,0,0.6)',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      userSelect: 'none',
      transition: 'background-color 0.3s ease',
    });

    button.addEventListener('mouseenter', () => {
      button.style.background = 'rgba(0,0,0,0.8)';
    });
    button.addEventListener('mouseleave', () => {
      button.style.background = 'rgba(0,0,0,0.6)';
    });

    button.addEventListener('click', togglePillarMode);

    document.body.appendChild(button);
  }

  // 移除按钮
  function removeButton() {
    if (button) {
      button.removeEventListener('click', togglePillarMode);
      button.remove();
      button = null;
      isPillarMode = false;
      resetFullscreenElementStyle();
    }
  }

  // 设置播放器铺满宽度（左右撑满）
  function setPillarModeStyle() {
    if (!fullscreenElement) return;
    // 让元素宽度铺满屏幕宽度，高度按视频比例自动，或者100%撑满高度也可以
    fullscreenElement.style.width = '100vw';
    fullscreenElement.style.height = 'auto';
    fullscreenElement.style.maxHeight = '100vh';
    fullscreenElement.style.objectFit = 'contain'; // 保持比例并撑满宽度
  }

  // 还原播放器样式
  function resetFullscreenElementStyle() {
    if (!fullscreenElement) return;
    fullscreenElement.style.width = '';
    fullscreenElement.style.height = '';
    fullscreenElement.style.maxHeight = '';
    fullscreenElement.style.objectFit = '';
  }

  // 切换铺满和还原
  function togglePillarMode() {
    if (!fullscreenElement) return;
    if (isPillarMode) {
      resetFullscreenElementStyle();
      button.textContent = '铺满全屏';
      isPillarMode = false;
    } else {
      setPillarModeStyle();
      button.textContent = '还原大小';
      isPillarMode = true;
    }
  }

  // 监听全屏变化
  function onFullscreenChange() {
    fullscreenElement = document.fullscreenElement;

    if (fullscreenElement && isLandscape()) {
      // 进入横屏全屏，创建按钮
      createButton();
    } else {
      // 退出全屏或非横屏，移除按钮
      removeButton();
    }
  }

  // 监听屏幕旋转或尺寸变化，动态判断是否需要按钮
  function onResizeOrOrientationChange() {
    if (document.fullscreenElement) {
      if (isLandscape()) {
        if (!button) createButton();
      } else {
        removeButton();
      }
    }
  }

  // 入口初始化
  function init() {
    document.addEventListener('fullscreenchange', onFullscreenChange);
    window.addEventListener('resize', onResizeOrOrientationChange);
    window.addEventListener('orientationchange', onResizeOrOrientationChange);
  }

  init();
})();
