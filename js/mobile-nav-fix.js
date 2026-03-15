(function () {
  function init() {
    var navbar = document.querySelector('.navbar.w-nav');
    if (!navbar) return;

    // Set CSS variable for navbar height so overlay can position correctly
    function updateNavHeight() {
      var h = navbar.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--navbar-height', h + 'px');
    }
    updateNavHeight();
    window.addEventListener('resize', updateNavHeight);

    // On mobile only: intercept hamburger click and prevent scroll-close conflict
    if (window.innerWidth > 479) return;

    var btn = document.querySelector('.w-nav-button');
    var overlay = document.querySelector('.w-nav-overlay');
    var menu = document.querySelector('.w-nav-menu');
    if (!btn || !overlay || !menu) return;

    var isOpen = false;

    function openNav() {
      isOpen = true;
      btn.classList.add('w--open');
      menu.setAttribute('data-nav-menu-open', '');
      overlay.style.display = 'block';
      overlay.style.height = 'auto';
    }

    function closeNav() {
      isOpen = false;
      btn.classList.remove('w--open');
      menu.removeAttribute('data-nav-menu-open');
      overlay.style.display = 'none';
      overlay.style.height = '';
    }

    // Capture phase: intercept before Webflow handles it
    btn.addEventListener('click', function (e) {
      e.stopImmediatePropagation();
      e.preventDefault();
      isOpen ? closeNav() : openNav();
    }, true);

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (isOpen && !navbar.contains(e.target)) {
        closeNav();
      }
    });

    // Prevent scroll events from closing the nav while open
    window.addEventListener('scroll', function (e) {
      if (isOpen) {
        e.stopImmediatePropagation();
      }
    }, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
