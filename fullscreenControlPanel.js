(function () {
  // 创建按钮函数：外部需要传入目标 video 或容器元素
  window.insertFillToggleButton = function (targetElement) {
    if (!targetElement || document.getElementById('fill-toggle-button')) return;

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
  };

  // 可选：退出全屏时自动清理按钮
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      const btn = document.getElementById('fill-toggle-button');
      btn?.remove();
    }
  });
})();
