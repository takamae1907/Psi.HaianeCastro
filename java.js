window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) { // A partir de 100px de rolagem
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
if (window.innerWidth > 500) {
  window.sr = ScrollReveal({ reset: true });

  sr.reveal('.tituloprincipal2', { duration: 1300, origin: 'top', distance: '20px' });
  sr.reveal('.bannerin', { duration: 1200, origin: 'top', distance: '20px' });
  sr.reveal('.img1', { duration: 1900, origin: 'top', distance: '20px' });
  sr.reveal('.cardimg', { duration: 1200, origin: 'top', distance: '20px' });
  sr.reveal('.cardtext', { duration: 1900, origin: 'top', distance: '20px' });
  sr.reveal('.h1text', { duration: 1200, origin: 'top', distance: '20px' });
  sr.reveal('.principal', { duration: 1900, origin: 'top', distance: '20px' });
  sr.reveal('.meublog', { duration: 1200, origin: 'top', distance: '20px' });
  sr.reveal('.blo', { duration: 1900, origin: 'top', distance: '20px' });
  sr.reveal('.baixoclass', { duration: 2100, origin: 'top', distance: '20px' });
  sr.reveal('.servicos', { duration: 1200, origin: 'top', distance: '20px' });
  sr.reveal('.centro', { duration: 1200, origin: 'top', distance: '20px' });
  sr.reveal('.image-section2', { duration: 1200, origin: 'top', distance: '20px' });
}
