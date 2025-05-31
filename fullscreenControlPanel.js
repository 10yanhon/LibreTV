(() => {
  const BUTTON_ID = 'fullscreen-pillar-button';
  let isPillarMode = false;
  let button = null;
  let fullscreenElement = null;

  function isLandscape() {
    return window.innerWidth > window.innerHeight;
  }

  function createButton() {
    if (button || !fullscreenElement) return;

    button = document.createElement('button');
    button.id = BUTTON_ID;
    button.textContent = '铺满全屏';

    Object.assign(button.style, {
      position: 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      padding: '10px 16px',
      fontSize: '16px',
      zIndex: 9999,
      cursor: 'pointer',
      background: 'rgba(0,0,0,0.6)',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      userSelect: 'none',
    });

    button.addEventListener('click', togglePillarMode);
    fullscreenElement.appendChild(button);
  }

  function removeButton() {
    if (button && button.parentNode) {
      button.removeEventListener('click', togglePillarMode);
      button.parentNode.removeChild(button);
    }
    button = null;
    isPillarMode = false;
    resetFullscreenElementStyle();
  }

  function setPillarModeStyle() {
    if (!fullscreenElement) return;
    fullscreenElement.style.width = '100vw';
    fullscreenElement.style.height = '100vh';
    fullscreenElement.style.objectFit = 'contain';
  }

  function resetFullscreenElementStyle() {
    if (!fullscreenElement) return;
    fullscreenElement.style.width = '';
    fullscreenElement.style.height = '';
    fullscreenElement.style.objectFit = '';
  }

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

  function onFullscreenChange() {
    fullscreenElement = document.fullscreenElement;

    if (fullscreenElement) {
      // 延迟 300ms，确保方向已稳定
      setTimeout(() => {
        if (isLandscape()) {
          createButton();
        } else {
          removeButton();
        }
      }, 300);
    } else {
      removeButton();
    }
  }

  function onResizeOrOrientationChange() {
    if (document.fullscreenElement) {
      if (isLandscape()) {
        if (!button) createButton();
      } else {
        removeButton();
      }
    }
  }

  function init() {
    document.addEventListener('fullscreenchange', onFullscreenChange);
    window.addEventListener('resize', onResizeOrOrientationChange);
    window.addEventListener('orientationchange', onResizeOrOrientationChange);
  }

  init();
})();
