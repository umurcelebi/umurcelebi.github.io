(() => {
  const spotlight = document.getElementById('cursorSpotlight');

  window.addEventListener('mousemove', (e) => {
    if (spotlight) {
      spotlight.style.left = `${e.clientX}px`;
      spotlight.style.top = `${e.clientY}px`;
    }
  });
})();
