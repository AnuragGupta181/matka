// app.js — final integrated JS: animations, smooth scroll, and download link logic
document.addEventListener('DOMContentLoaded', function(){
  // set year in footer
  var y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  // Smooth scroll for anchors
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

  // observe rows, features, steps
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

  // Hero small animation
  var logo = document.querySelector('.logo-box');
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

  // accessible micro-interaction for CTA focus
  var ctas = document.querySelectorAll('.btn');
  ctas.forEach(function(b){
    b.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){
        b.classList.add('active');
        setTimeout(function(){ b.classList.remove('active'); }, 200);
      }
    });
  });

  // ensure Whatsapp anchors open in new tab and have valid href
  var waAnchors = document.querySelectorAll('a.whatsapp');
  waAnchors.forEach(function(a){
    a.setAttribute('target','_blank');
    a.setAttribute('rel','noopener');
    if(!a.href || a.href === '#'){
      a.href = 'https://wa.me/9376462470';
    }
  });

  // ensure the phone anchor has correct tel
  var phoneAnchor = document.querySelector('.link-phone');
  if(phoneAnchor) phoneAnchor.setAttribute('href','tel:9376462470');

  // DOWNLOAD BUTTONS — unified logic:
  // All devices download the APK located in public/sky_matka.apk
  var downloadButtons = document.querySelectorAll('.download-btn');
  downloadButtons.forEach(function(btn){
    var local = btn.getAttribute('data-local') || 'public/sky_matka.apk';

    // set href to local APK and enforce download attribute
    btn.setAttribute('href', local);
    btn.setAttribute('download', 'sky_matka.apk');

    // encourage safe behavior: open in same tab (no target)
    btn.removeAttribute('target');
    btn.removeAttribute('rel');

    // small accessibility hint
    btn.setAttribute('aria-label', 'Download Sky Matka APK');
  });

});
