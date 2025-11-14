// app.js — scroll-triggered animations, smooth scroll, and download link logic

document.addEventListener('DOMContentLoaded', function(){
  // set year in footer
  var y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  // Smooth scroll for anchors (preserves existing behavior)
  document.addEventListener('click', function(e){
    var a = e.target.closest('a[href^="#"]');
    if(!a) return;
    var href = a.getAttribute('href');
    if(href === '#') return;
    var target = document.querySelector(href);
    if(!target) return;
    e.preventDefault();
    target.scrollIntoView({behavior:'smooth', block:'start'});
  });

  // IntersectionObserver for reveal animations
  var revealOptions = { root: null, rootMargin: '0px 0px -8%', threshold: 0.08 };
  var revealObserver = new IntersectionObserver(function(entries, obs){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, revealOptions);

  // observe rate rows, features, steps
  var rateRows = document.querySelectorAll('.rate-row');
  rateRows.forEach(function(row, i){
    row.classList.add('reveal');
    row.style.transitionDelay = (i*80)+'ms';
    revealObserver.observe(row);
  });

  var features = document.querySelectorAll('.feature');
  features.forEach(function(el,i){
    el.classList.add('reveal');
    el.style.transitionDelay = (i*80 + 120)+'ms';
    revealObserver.observe(el);
  });

  var steps = document.querySelectorAll('.step');
  steps.forEach(function(el,i){
    el.classList.add('reveal');
    el.style.transitionDelay = (i*110 + 160)+'ms';
    revealObserver.observe(el);
  });

  // Hero small animation: slightly pop the logo and heading once on load
  var logo = document.querySelector('.logo-circle');
  var heroHeading = document.querySelector('header h1');
  if(logo){
    logo.animate([
      { transform: 'translateY(6px) scale(.98)', opacity: .95 },
      { transform: 'translateY(0) scale(1)', opacity: 1 }
    ], { duration: 700, easing: 'cubic-bezier(.2,.9,.3,1)' });
  }
  if(heroHeading){
    heroHeading.animate([
      { transform: 'translateY(6px)', opacity: 0 },
      { transform: 'translateY(0)', opacity: 1 }
    ], { duration: 700, delay: 160, easing: 'cubic-bezier(.2,.9,.3,1)' });
  }

  // micro-interaction for CTA focus
  var ctas = document.querySelectorAll('.btn');
  ctas.forEach(function(b){
    b.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){
        b.classList.add('active');
        setTimeout(function(){ b.classList.remove('active'); }, 200);
      }
    });
  });

  // Set WhatsApp & phone links (explicit)
  var waAnchors = document.querySelectorAll('a.whatsapp');
  waAnchors.forEach(function(a){
    // ensure direct chat link
    a.setAttribute('target','_blank');
    a.setAttribute('rel','noopener');
    if(!a.href || a.href === '#'){
      a.href = 'https://wa.me/9376462470';
    }
  });

  var phoneLinks = document.querySelectorAll('a[href^="tel:"], .link-phone');
  // ensure the phone anchor has correct tel
  var phoneAnchor = document.querySelector('.link-phone');
  if(phoneAnchor) phoneAnchor.setAttribute('href','tel:9376462470');

  // DOWNLOAD BUTTONS — hybrid logic:
  // Desktop => local ./matka.apk (direct download)
  // Mobile  => redirect to remote Play Store redirect URL
  function isMobileDevice(){
    // reliable-enough UA check for this purpose
    return /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent);
  }

  var downloadButtons = document.querySelectorAll('.download-btn');
  downloadButtons.forEach(function(btn){
    var local = btn.getAttribute('data-local') || './matka.apk';
    var remote = btn.getAttribute('data-remote') || 'https://skymatka.online/redirect-play-store';

    if(isMobileDevice()){
      // mobile: open remote redirect (Play Store)
      btn.setAttribute('href', remote);
      btn.setAttribute('target','_blank');
      btn.setAttribute('rel','noopener');
    } else {
      // desktop: direct download of local apk
      btn.setAttribute('href', local);
      // add download attribute so browser will download
      btn.setAttribute('download','matka.apk');
      // ensure link opens in same tab (no target)
      btn.removeAttribute('target');
      btn.removeAttribute('rel');
    }
  });

});
