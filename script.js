const config = window.SITE_CONFIG || {};
const heroImage = document.querySelector('#hero-image');
heroImage.src = config.heroImage || heroImage.src;
heroImage.alt = config.heroImageAlt || heroImage.alt;
if (config.isDemoImage === false) document.querySelector('.image-label').hidden = true;
document.querySelector('#year').textContent = new Date().getFullYear();
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
}));
const dialog = document.querySelector('#purchase-dialog');
document.querySelectorAll('.purchase').forEach(button => button.addEventListener('click', () => {
  document.querySelector('#purchase-message').textContent = `日南ゆずピール（${button.dataset.product}）は販売準備中です。現在、ご注文・お支払いはできません。`;
  dialog.showModal();
}));
document.querySelectorAll('.dialog-close, .dialog-done').forEach(button => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
if (config.youtubeVideoId && /^[\w-]{11}$/.test(config.youtubeVideoId)) {
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube-nocookie.com/embed/${config.youtubeVideoId}`;
  iframe.title = 'YUZUちゃんのミュージックビデオ';
  iframe.loading = 'lazy'; iframe.allowFullscreen = true;
  document.querySelector('#video-container').replaceChildren(iframe);
}
if (config.aiCityNichinanUrl) {
  try {
    const url = new URL(config.aiCityNichinanUrl);
    if (url.protocol === 'https:') {
      const link = document.querySelector('#local-link');
      link.href = url.href; link.target = '_blank'; link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', '愛シティ日南について（新しいタブで開く）');
      document.querySelector('#local-note').textContent = '外部サイトが新しいタブで開きます。';
    }
  } catch { /* 未設定・無効なURLは準備中のまま表示 */ }
}
