/* ==========================================================================
   XUBO Interactive Script
   TV Look Switcher & Navigation Helpers
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tv-tab-btn');
  const screens = document.querySelectorAll('.tv-screen img');
  const titleEl = document.querySelector('[data-look-title]');
  const descEl = document.querySelector('[data-look-desc]');

  const lookData = {
    'live': {
      title: 'Canlı TV ve Program Rehberi (EPG)',
      desc: 'Kategoriler, anlık yayın akışı ve kumanda tuşlarıyla tek dokunuşta kesintisiz kanal geçişi.'
    },
    'vod': {
      title: 'Film ve Diziler (VOD)',
      desc: 'Görsel afiş duvarı, kategori rafları, kaldığınız yerden devam etme ve detay bilgileri.'
    },
    'login': {
      title: 'Giriş ve Çoklu Profil',
      desc: 'Xtream ve M3U hesaplarınızı kolayca ekleyin; evdeki herkes için ayrı profil yönetimi.'
    },
    'settings': {
      title: 'Ayarlar ve Ebeveyn Kilidi',
      desc: 'Görünüm ayarları, ses/altyazı tercihleri ve PIN korumalı yetişkin kategori kilidi.'
    }
  };

  function switchTab(targetKey) {
    // Update tab buttons
    tabs.forEach(tab => {
      const isMatch = tab.getAttribute('data-target') === targetKey;
      tab.classList.toggle('is-active', isMatch);
      tab.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });

    // Update screen images
    screens.forEach(img => {
      const isMatch = img.getAttribute('data-screen') === targetKey;
      img.classList.toggle('is-active', isMatch);
    });

    // Update captions
    if (lookData[targetKey] && titleEl && descEl) {
      titleEl.textContent = lookData[targetKey].title;
      descEl.textContent = lookData[targetKey].desc;
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-target');
      if (target) switchTab(target);
    });

    // Keyboard navigation (Left / Right arrow keys)
    tab.addEventListener('keydown', (e) => {
      const tabArr = Array.from(tabs);
      const currentIndex = tabArr.indexOf(tab);
      let nextIndex = null;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextIndex = (currentIndex + 1) % tabArr.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        nextIndex = (currentIndex - 1 + tabArr.length) % tabArr.length;
      }

      if (nextIndex !== null) {
        e.preventDefault();
        tabArr[nextIndex].focus();
        const target = tabArr[nextIndex].getAttribute('data-target');
        if (target) switchTab(target);
      }
    });
  });
});
