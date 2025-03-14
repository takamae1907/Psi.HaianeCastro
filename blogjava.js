document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const target = document.querySelector(header.getAttribute('data-target'));
    const isOpen = target.classList.contains('open');
    
    // Fecha todas as abas
    document.querySelectorAll('.accordion-body').forEach(body => body.classList.remove('open'));
    document.querySelectorAll('.accordion-header').forEach(h => {
      h.textContent = h.textContent.replace('▴', '▾');
      h.classList.remove('active');
    });

    // Abre a aba clicada se não estiver aberta
    if (!isOpen) {
      target.classList.add('open');
      header.classList.add('active');
      header.textContent = header.textContent.replace('▾', '▴');
    }
  });
});

window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) { // A partir de 100px de rolagem
      navbar.classList.add('scrolled');
  } else {
      navbar.classList.remove('scrolled');
  }
});