// app.js — scroll-triggered strong slide + pop animations, smooth scroll, and small UI helpers

// set year in footer
document.addEventListener('DOMContentLoaded', function(){
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

  // IntersectionObserver for reveal animations (scroll-triggered)
  var revealOptions = { root: null, rootMargin: '0px 0px -8%', threshold: 0.08 };
  var revealObserver = new IntersectionObserver(function(entries, obs){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, revealOptions);

  // Apply observer to rate rows, features, steps, and other reveal elements
  var rateRows = document.querySelectorAll('.rate-row');
  rateRows.forEach(function(row, i){
    row.classList.add('reveal');
    // staggered delay for nicer pop
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
      { transform: 'translateY(6px) scale(.98)', opacity: .9 },
      { transform: 'translateY(0) scale(1)', opacity: 1 }
    ], { duration: 700, easing: 'cubic-bezier(.2,.9,.3,1)' });
  }
  if(heroHeading){
    heroHeading.animate([
      { transform: 'translateY(6px)', opacity: 0 },
      { transform: 'translateY(0)', opacity: 1 }
    ], { duration: 700, delay: 160, easing: 'cubic-bezier(.2,.9,.3,1)' });
  }

  // small micro-interaction for CTA focus (keyboard accessible)
  var ctas = document.querySelectorAll('.btn');
  ctas.forEach(function(b){
    b.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){
        b.classList.add('active');
        setTimeout(function(){ b.classList.remove('active'); }, 200);
      }
    });
  });

  // Optional: make whatsapp button open with prefilled message if present
  var wa = document.querySelector('.btn.whatsapp');
  if(wa){
    wa.addEventListener('click', function(e){
      // if user wants to customize add a message below
      var msg = encodeURIComponent('Hi, I want to know more about Sky Matka Group and bonuses.');
      wa.setAttribute('href', 'https://wa.me/?text=' + msg);
    });
  }
});
