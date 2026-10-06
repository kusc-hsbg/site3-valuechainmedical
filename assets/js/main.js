document.addEventListener('DOMContentLoaded', function() {
  // Header scroll effect
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Mobile menu
  var menuBtn = document.querySelector('.mobile-menu-btn');
  var mobileNav = document.querySelector('.mobile-nav');
  var mobileOverlay = document.querySelector('.mobile-nav-overlay');
  var mobileClose = document.querySelector('.mobile-nav-close');

  function openMobileMenu() {
    if (mobileNav) mobileNav.classList.add('open');
    if (mobileOverlay) mobileOverlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (mobileNav) mobileNav.classList.remove('open');
    if (mobileOverlay) mobileOverlay.style.display = 'none';
    document.body.style.overflow = '';
  }

  if (menuBtn) menuBtn.addEventListener('click', openMobileMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

  // FAQ accordion
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function(item) {
    var question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function() {
        var wasOpen = item.classList.contains('open');
        faqItems.forEach(function(i) { i.classList.remove('open'); });
        if (!wasOpen) item.classList.add('open');
      });
    }
  });

  // Gallery slider
  var galleryTrack = document.querySelector('.gallery-track');
  if (galleryTrack) {
    var galleryItems = galleryTrack.querySelectorAll('.gallery-item');
    var currentGallerySlide = 0;
    var galleryInterval;

    function goToGallerySlide(index) {
      currentGallerySlide = index;
      galleryTrack.style.transform = 'translateX(-' + (currentGallerySlide * 100) + '%)';
    }

    function nextGallerySlide() {
      currentGallerySlide = (currentGallerySlide + 1) % galleryItems.length;
      goToGallerySlide(currentGallerySlide);
    }

    galleryInterval = setInterval(nextGallerySlide, 4000);
  }

  // Clients slider auto-scroll
  var clientsTrack = document.querySelector('.clients-track');
  if (clientsTrack) {
    var clientItems = clientsTrack.querySelectorAll('.client-item');
    var clientPos = 0;
    var clientItemWidth = 20;

    function scrollClients() {
      clientPos++;
      var maxScroll = clientItems.length - 5;
      if (clientPos > maxScroll) clientPos = 0;
      clientsTrack.style.transform = 'translateX(-' + (clientPos * clientItemWidth) + '%)';
    }

    setInterval(scrollClients, 3000);
  }

  // Fade-in animations on scroll
  var fadeEls = document.querySelectorAll('.fade-in');
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(function(el) {
    observer.observe(el);
  });

  // Active nav link
  var currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  var fileName = currentPath.split('/').pop() || 'index.html';
  var navLinks = document.querySelectorAll('.nav-menu a, .mobile-nav a');
  navLinks.forEach(function(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    if (href === fileName) {
      link.classList.add('active');
    }
  });
});

function handleFormSubmit(e) {
  e.preventDefault();
  alert('신청이 완료되었습니다.');
  e.target.reset();
  return false;
}
