(() => {
  // 1. Live Broadcast Telemetry Clock
  const liveClockEl = document.getElementById('liveClock');
  const osdTimeEl = document.getElementById('osdTime');

  function updateClocks() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    if (liveClockEl) liveClockEl.textContent = `${hh}:${mm}:${ss} TRT`;
    if (osdTimeEl) osdTimeEl.textContent = `${hh}:${mm}`;
  }
  updateClocks();
  setInterval(updateClocks, 1000);

  // 2. Ambient Cursor Spotlight & Subtle 3D OLED Perspective
  const spotlight = document.getElementById('cursorSpotlight');
  const oledFrame = document.getElementById('oledFrame');

  window.addEventListener('mousemove', (e) => {
    if (spotlight) {
      spotlight.style.left = `${e.clientX}px`;
      spotlight.style.top = `${e.clientY}px`;
    }

    if (oledFrame && window.innerWidth > 960) {
      const rect = oledFrame.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      const rotY = Math.max(-3.2, Math.min(3.2, deltaX * 2.6));
      const rotX = Math.max(-2.4, Math.min(2.4, -deltaY * 2.0));
      oledFrame.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    }
  });

  // 3. Automated 10-Foot OSD Spatial Focus & Ambilight Sync
  const channelData = [
    {
      title: 'Dune: Part Two (IMAX 4K)',
      desc: 'Arrakis çöl gezegeninde geçen destansı sinema deneyimi. HDR10+ yüksek dinamik aralık ve kayıpsız Dolby Atmos ses iziyle yayınlanıyor.',
      start: '21:00',
      end: '23:45',
      progress: 48,
      aura: 'radial-gradient(ellipse at 50% 48%, rgba(218, 156, 86, 0.22) 0%, rgba(120, 74, 34, 0.12) 45%, rgba(0, 0, 0, 0) 75%)',
      palette: ['#d89b56', '#3d2410', '#090705']
    },
    {
      title: 'Blade Runner 2049 (IMAX Master)',
      desc: '2049 yılında Los Angeles\'ta geçen, yüksek dinamik aralıklı (HDR10+) ve kayıpsız çoklu ses iziyle sunulan görsel başyapıt.',
      start: '20:30',
      end: '23:15',
      progress: 64,
      aura: 'radial-gradient(ellipse at 50% 48%, rgba(214, 178, 132, 0.18) 0%, rgba(74, 116, 168, 0.14) 45%, rgba(0, 0, 0, 0) 75%)',
      palette: ['#c99e67', '#264363', '#05070b']
    },
    {
      title: 'Hans Zimmer Live in Prague',
      desc: 'Tam senfoni orkestrası ve koro eşliğinde sinema tarihinin en ikonik film müzikleri. 24-bit kayıpsız stüdyo akustik akışı.',
      start: '21:15',
      end: '23:00',
      progress: 37,
      aura: 'radial-gradient(ellipse at 50% 48%, rgba(188, 164, 212, 0.18) 0%, rgba(88, 64, 128, 0.12) 45%, rgba(0, 0, 0, 0) 75%)',
      palette: ['#b598d6', '#2b1e44', '#060509']
    },
    {
      title: 'Iceland: Volcanic Silence',
      desc: 'İzlanda\'nın bazalt kanyonları ve aktif volkanik kraterleri üzerinde 60 FPS ultra akıcı, saf siyah kontrastlı doğa belgeseli.',
      start: '21:00',
      end: '22:00',
      progress: 79,
      aura: 'radial-gradient(ellipse at 50% 48%, rgba(122, 178, 166, 0.19) 0%, rgba(42, 82, 92, 0.12) 45%, rgba(0, 0, 0, 0) 75%)',
      palette: ['#72ab9e', '#17363b', '#040809']
    }
  ];

  const rows = document.querySelectorAll('.osd-channel-row');
  const epgTitle = document.getElementById('epgTitle');
  const epgDesc = document.getElementById('epgDesc');
  const epgStart = document.getElementById('epgStart');
  const epgEnd = document.getElementById('epgEnd');
  const epgElapsed = document.getElementById('epgElapsed');
  const epgBarFill = document.getElementById('epgBarFill');
  const ambilightAura = document.getElementById('ambilightAura');

  let activeIndex = 1;
  let currentPalette = channelData[1].palette;

  function setChannelFocus(idx) {
    activeIndex = idx;
    const item = channelData[idx];
    rows.forEach((r, i) => {
      if (i === idx) {
        r.classList.add('is-focused');
      } else {
        r.classList.remove('is-focused');
      }
    });

    if (epgTitle) epgTitle.textContent = item.title;
    if (epgDesc) epgDesc.textContent = item.desc;
    if (epgStart) epgStart.textContent = item.start;
    if (epgEnd) epgEnd.textContent = item.end;
    if (epgElapsed) epgElapsed.textContent = `%${item.progress} TAMAMLANDI`;
    if (epgBarFill) epgBarFill.style.width = `${item.progress}%`;
    if (ambilightAura) ambilightAura.style.background = item.aura;
    currentPalette = item.palette;
  }

  setInterval(() => {
    const next = (activeIndex + 1) % channelData.length;
    setChannelFocus(next);
  }, 3800);

  // 4. Procedural 4K Cinema Canvas inside the OLED Screen
  const canvas = document.getElementById('cinemaCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let t = 0;

    function resizeCanvas() {
      canvas.width = 640;
      canvas.height = 360;
    }
    resizeCanvas();

    function renderCinema() {
      t += 0.008;
      const w = canvas.width;
      const h = canvas.height;

      ctx.fillStyle = currentPalette[2];
      ctx.fillRect(0, 0, w, h);

      // Slow moving atmospheric cinema light orbs
      const x1 = w * (0.55 + Math.sin(t) * 0.18);
      const y1 = h * (0.42 + Math.cos(t * 0.7) * 0.14);
      const grad1 = ctx.createRadialGradient(x1, y1, 10, x1, y1, w * 0.55);
      grad1.addColorStop(0, currentPalette[0] + '55');
      grad1.addColorStop(0.5, currentPalette[1] + '44');
      grad1.addColorStop(1, 'transparent');

      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, w, h);

      const x2 = w * (0.3 + Math.cos(t * 0.6) * 0.15);
      const y2 = h * (0.65 + Math.sin(t * 0.9) * 0.12);
      const grad2 = ctx.createRadialGradient(x2, y2, 5, x2, y2, w * 0.45);
      grad2.addColorStop(0, currentPalette[1] + '66');
      grad2.addColorStop(1, 'transparent');

      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, w, h);

      requestAnimationFrame(renderCinema);
    }
    renderCinema();
  }

  // 5. Scroll Reveal Observer
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => observer.observe(el));
})();
