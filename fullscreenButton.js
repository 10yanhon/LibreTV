document.addEventListener("DOMContentLoaded", () => {
  let buttonInserted = false;

  function isLandscapeFullscreen() {
    return (
      document.fullscreenElement &&
      screen.orientation &&
      screen.orientation.type.startsWith("landscape")
    );
  }

  function createFullscreenButton() {
    if (buttonInserted) return;

    const panel = document.createElement("div");
    panel.id = "fullscreenControlPanel";
    panel.style = `
      position: fixed;
      top: 10px;
      right: 10px;
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
    `;

    const btn = document.createElement("button");
    btn.id = "fullscreenBtn";
    btn.textContent = "⛶";
    btn.style = `
      background: #222;
      color: #fff;
      border: 1px solid #444;
      border-radius: 6px;
      padding: 6px 10px;
      font-size: 16px;
      cursor: pointer;
      opacity: 0.85;
    `;

    btn.addEventListener("click", () => {
      if (!document.fullscreenElement) return;
      const iframe = document.fullscreenElement.querySelector("video") || document.fullscreenElement;
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      }
    });

    panel.appendChild(btn);
    document.body.appendChild(panel);
    buttonInserted = true;
  }

  function removeFullscreenButton() {
    const panel = document.getElementById("fullscreenControlPanel");
    if (panel) panel.remove();
    buttonInserted = false;
  }

  document.addEventListener("fullscreenchange", () => {
    if (isLandscapeFullscreen()) {
      createFullscreenButton();
    } else {
      removeFullscreenButton();
    }
  });
});
