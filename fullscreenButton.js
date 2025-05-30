function isLandscape() {
  return window.innerWidth > window.innerHeight;
}

function updatePanelVisibility() {
  const panel = document.getElementById("fullscreenControlPanel");
  if (!panel) return;

  panel.style.display = isLandscape() ? "block" : "none";
}

window.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("fullscreenBtn");
  const video = document.querySelector("video");

  btn.addEventListener("click", () => {
    if (video) {
      video.style.position = "fixed";
      video.style.top = "0";
      video.style.left = "0";
      video.style.width = "100vw";
      video.style.height = "100vh";
      video.style.zIndex = "9999";
      video.style.backgroundColor = "#000";
    }
  });

  updatePanelVisibility();
});

window.addEventListener("resize", () => {
  setTimeout(updatePanelVisibility, 300);
});
