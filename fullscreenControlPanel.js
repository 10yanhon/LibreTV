(function () {
  /**
   * 核心思路：
   * 1. 在 DOMContentLoaded 时，先往 <head> 内注入一段 CSS：
   *    - 默认情况下，#fill-toggle-button 一律 display: none
   *    - 只有当页面物理横屏（orientation: landscape）且存在一个 :fullscreen 元素时，
   *      我们让 #fill-toggle-button display: block，并将它放置到全屏元素内部
   * 2. 监听 fullscreenchange 事件：
   *    - 当有元素进入全屏：把我们的按钮插入到 document.fullscreenElement 内部，
   *      此时“横屏 & :fullscreen”生效之后，CSS 会自动让按钮显现
   *    - 当退出全屏：按钮自动不再满足 :fullscreen + 横屏条件，CSS 隐藏；
   *      同时我们把它从 DOM 里移除，避免残留
   * 3. 按钮自身提供“切换铺满/还原”逻辑，把全屏元素的宽高 & object-fit 修改到 100vw/100vh
   */

  /*** 一、先插入 CSS ***/
  function insertCSS() {
    const css = `
      /* 按钮默认隐藏 */
      #fill-toggle-button {
        display: none !important;
      }

      /* 当“有元素处于全屏”且“设备物理横屏”时，显示按钮 */
      @media screen and (orientation: landscape) {
        /* 注意：:fullscreen 伪类指正在全屏的元素 */
        :fullscreen #fill-toggle-button {
          display: block !important;
        }
      }

      /* 若需要兼容某些老浏览器前缀，下面可视情况添加：
      @media screen and (orientation: landscape) {
        :-webkit-full-screen #fill-toggle-button { display: block !important; }
        :-moz-full-screen    #fill-toggle-button { display: block !important; }
        :-ms-fullscreen       #fill-toggle-button { display: block !important; }
      }
      */
    `;

    const styleEl = document.createElement('style');
    styleEl.setAttribute('type', 'text/css');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
  }

  /*** 二、创建并返回“铺满/还原”按钮 DOM ***/
  function createFillToggleButton() {
    // 如果已经存在，就不要重复创建
    if (document.getElementById('fill-toggle-button')) {
      return document.getElementById('fill-toggle-button');
    }

    const btn = document.createElement('button');
    btn.id = 'fill-toggle-button';
    btn.textContent = '铺满全屏';
    btn.dataset.active = '0';

    // 基础样式，绝对定位交给 CSS 控制显示/隐藏
    Object.assign(btn.style, {
      position: 'absolute',
      bottom: '10%',            // 距离底部 10%
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 9999,
      fontSize: '16px',
      padding: '10px 22px',
      borderRadius: '6px',
      border: 'none',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      color: '#fff',
      cursor: 'pointer',
      userSelect: 'none',
    });

    // 点击切换“铺满” / “还原”
    btn.addEventListener('click', () => {
      const active = btn.dataset.active === '1';
      // 全屏元素（唯一）
      const fsEl = document.fullscreenElement;
      if (!fsEl) return;

      if (active) {
        // 还原
        fsEl.style.width = '';
        fsEl.style.height = '';
        fsEl.style.objectFit = '';
        btn.textContent = '铺满全屏';
        btn.dataset.active = '0';
      } else {
        // 铺满
        fsEl.style.width = '100vw';
        fsEl.style.height = '100vh';
        fsEl.style.objectFit = 'contain';
        btn.textContent = '还原大小';
        btn.dataset.active = '1';
      }
    });

    return btn;
  }

  /*** 三、将按钮插入到“当前全屏元素”里 ***/
  function appendButtonToFullscreenElement() {
    const fsEl = document.fullscreenElement;
    if (!fsEl) return;
    const btn = createFillToggleButton();
    // 如果还没被插入，则插进去
    if (!fsEl.contains(btn)) {
      fsEl.appendChild(btn);
    }
  }

  /*** 四、当退出全屏时，立刻移除按钮 ***/
  function removeButtonFromDOM() {
    const btn = document.getElementById('fill-toggle-button');
    if (btn && btn.parentNode) {
      btn.parentNode.removeChild(btn);
    }
  }

  /*** 五、初始化流程 ***/
  function init() {
    // （1）先把 CSS 注入进来
    insertCSS();

    // （2）监听 fullscreenchange
    document.addEventListener('fullscreenchange', () => {
      // 进入全屏
      if (document.fullscreenElement) {
        // 先把按钮挂到 fullscreenElement 里
        appendButtonToFullscreenElement();
        // CSS 决定：只有当“物理横屏”且“在全屏元素内部”时才会真正显示
      } else {
        // 退出全屏：移除按钮
        removeButtonFromDOM();
      }
    });
  }

  // 等 DOMReady 后执行 init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
