(function () {
  // 配置：监听的按钮选择器
  const fullscreenButtonSelector = 'li.fullscreen';

  // 主容器进入 fullscreen 后，注入浮动按钮
  function injectFillToggleButton(targetElement) {
    if (document.getElementById('fill-toggle-button')) return; // 已存在则不重复添加

    const button = document.createElement('button');
    button.id = 'fill-toggle-button';
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
      if (isActive) {
        // 还原
        targetElement.style.width = '';
        targetElement.style.height = '';
        targetElement.style.objectFit = '';
        button.textContent = '铺满全屏';
        button.dataset.active = '0';
      } else {
        // 铺满
        targetElement.style.width = '100vw';
        targetElement.style.height = '100vh';
        targetElement.style.objectFit = 'contain';
        button.textContent = '还原大小';
        button.dataset.active = '1';
      }
    });

    document.body.appendChild(button);
  }

  // 监听点击你页面中的“全屏”按钮
  const setup = () => {
    const btn = document.querySelector(fullscreenButtonSelector);
    if (!btn) return;

    btn.addEventListener('click', () => {
      // 等待 fullscreen 生效后再插入按钮（避免方向未完成）
      setTimeout(() => {
        const fullscreenEl = document.fullscreenElement;
        if (fullscreenEl) {
          injectFillToggleButton(fullscreenEl);
        }
      }, 500); // 延时执行，确保 fullscreen 生效
    });
  };

  // 清理按钮：退出 fullscreen 后自动移除浮层按钮
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      const btn = document.getElementById('fill-toggle-button');
      btn?.remove();
    }
  });

  // 初始化
  document.addEventListener('DOMContentLoaded', setup);
})();
