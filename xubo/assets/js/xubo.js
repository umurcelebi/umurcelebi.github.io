/* ==========================================================================
   XUBO Interactive Engine
   OLED Showcase Controller & Utility Functions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const dockButtons = document.querySelectorAll('.dock-btn');
  const tvScreens = document.querySelectorAll('.tv-display img');
  const captionTitle = document.querySelector('[data-dock-title]');
  const captionDesc = document.querySelector('[data-dock-desc]');
  const ambientGlow = document.querySelector('.ambient-glow');

  const screenMetadata = {
    'live': {
      title: 'Canlı TV ve Elektronik Program Rehberi (EPG)',
      desc: 'Anlık ve sıradaki yayın bilgisi, kategori bazlı filtreleme ve kumandadan doğrudan sayı ile kanal seçimi.',
      glow: 'radial-gradient(ellipse at center, rgba(0, 229, 255, 0.22) 0%, rgba(56, 189, 248, 0.12) 40%, transparent 70%)'
    },
    'vod': {
      title: '4K VOD Sinema & Film Kütüphanesi',
      desc: 'IMDb puanları, oyuncu kadrosu, film özetleri ve kaldığınız saniyeyi otomatik hatırlayan akıllı oynatıcı hafızası.',
      glow: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.24) 0%, rgba(168, 85, 247, 0.14) 40%, transparent 70%)'
    },
    'series': {
      title: 'Dizi & Sezon Takip Arayüzü',
      desc: 'Sezon rafları, bölüm listeleri, sonraki bölüme otomatik geçiş ve izleme yüzdesi takibi.',
      glow: 'radial-gradient(ellipse at center, rgba(236, 72, 153, 0.2) 0%, rgba(99, 102, 241, 0.14) 40%, transparent 70%)'
    },
    'login': {
      title: 'Çoklu Kaynak & Hesap Yönetimi',
      desc: 'Xtream Codes API, M3U / M3U8 ve MAC Portal destekli; evdeki herkes için bağımsız profil ayrımı.',
      glow: 'radial-gradient(ellipse at center, rgba(34, 197, 94, 0.18) 0%, rgba(0, 229, 255, 0.12) 40%, transparent 70%)'
    },
    'settings': {
      title: 'Sistem Tercihleri ve PIN Ebeveyn Kilidi',
      desc: 'HLS/TS akış formatı, ses ve altyazı motoru, uyku zamanlayıcısı ve 4 haneli PIN ile kategori gizleme.',
      glow: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.2) 0%, rgba(99, 102, 241, 0.12) 40%, transparent 70%)'
    }
  };

  function activateScreen(key) {
    // 1. Update Buttons
    dockButtons.forEach(btn => {
      const match = btn.getAttribute('data-target') === key;
      btn.classList.toggle('is-active', match);
      btn.setAttribute('aria-selected', match ? 'true' : 'false');
    });

    // 2. Update TV Screen Images
    tvScreens.forEach(img => {
      const match = img.getAttribute('data-screen') === key;
      img.classList.toggle('is-visible', match);
    });

    // 3. Update Captions & Glow
    const meta = screenMetadata[key];
    if (meta) {
      if (captionTitle) captionTitle.textContent = meta.title;
      if (captionDesc) captionDesc.textContent = meta.desc;
      if (ambientGlow) ambientGlow.style.background = meta.glow;
    }
  }

  dockButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      if (target) activateScreen(target);
    });
  });

  // Copy to clipboard helper
  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        try {
          await navigator.clipboard.writeText(textToCopy);
          const originalText = btn.textContent;
          btn.textContent = 'Kopyalandı ✓';
          setTimeout(() => {
            btn.textContent = originalText;
          }, 2000);
        } catch (e) {
          console.error('Kopyalama hatası:', e);
        }
      }
    });
  });
});
