// Enhanced JS: nav, theme toggle, reveal-on-scroll, form validation, photo overlay, and tilt
document.addEventListener('DOMContentLoaded', function(){
  // set year
  var yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // NAV: toggle and close behavior
  var navToggle = document.getElementById('nav-toggle');
  var siteNav = document.getElementById('site-nav');
  if(navToggle && siteNav){
    navToggle.addEventListener('click', function(){
      siteNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', siteNav.classList.contains('open'));
    });

    // close navigation when a link is clicked (mobile)
    siteNav.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', function(){
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Close open nav or overlays with Escape
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      if(siteNav) siteNav.classList.remove('open');
      var overlay = document.getElementById('photo-overlay');
      if(overlay) overlay.classList.remove('open');
    }
  });

  // THEME: toggle and persist
  var themeToggle = document.getElementById('theme-toggle');
  function applyTheme(theme){
    document.documentElement.classList.toggle('dark', theme === 'dark');
    if(themeToggle) {
      themeToggle.textContent = theme === 'dark' ? '☀' : '🌙';
      themeToggle.setAttribute('aria-pressed', theme === 'dark');
    }
  }
  var saved = localStorage.getItem('site-theme');
  if(saved) applyTheme(saved);
  else {
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }
  if(themeToggle){
    themeToggle.addEventListener('click', function(){
      var isDark = document.documentElement.classList.contains('dark');
      var next = isDark ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('site-theme', next);
    });
  }

  // Reveal on scroll
  var revealItems = document.querySelectorAll('[data-reveal]');
  if('IntersectionObserver' in window && revealItems.length){
    var ro = new IntersectionObserver(function(entries, obs){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, {threshold: 0.12});
    revealItems.forEach(function(el){ ro.observe(el); });
  } else {
    // fallback: reveal all
    revealItems.forEach(function(el){ el.classList.add('visible'); });
  }

  // Smooth scroll for same-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var targetId = a.getAttribute('href').slice(1);
      var target = document.getElementById(targetId);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // Contact form validation (client-side)
  var form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var name = document.getElementById('name');
      var email = document.getElementById('email');
      var message = document.getElementById('message');
      var feedback = document.getElementById('form-feedback');
      feedback.textContent = '';
      feedback.style.color = '';

      if(!name.value.trim() || !email.value.trim() || !message.value.trim()){
        feedback.style.color = 'crimson';
        feedback.textContent = 'Please fill out all fields.';
        return;
      }
      var re = /\S+@\S+\.\S+/;
      if(!re.test(email.value)){
        feedback.style.color = 'crimson';
        feedback.textContent = 'Please enter a valid email address.';
        return;
      }
      // demo success
      feedback.style.color = 'green';
      feedback.textContent = 'Thanks! Your message was sent (demo).';
      form.reset();
    });
  }

  // Photo overlay (click to enlarge)
  var heroPhoto = document.getElementById('hero-photo');
  var overlay = document.getElementById('photo-overlay');
  var closeBtn = document.getElementById('photo-close');
  if(heroPhoto && overlay){
    heroPhoto.style.cursor = 'zoom-in';
    heroPhoto.addEventListener('click', function(){
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden','false');
    });
    overlay.addEventListener('click', function(e){
      if(e.target === overlay || e.target === closeBtn){
        overlay.classList.remove('open');
        overlay.setAttribute('aria-hidden','true');
      }
    });
  }

  // Project card tilt effect (mouse)
  document.querySelectorAll('.project-card').forEach(function(card){
    card.addEventListener('mousemove', function(e){
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var cx = rect.width/2;
      var cy = rect.height/2;
      var dx = (x - cx) / cx; // -1 .. 1
      var dy = (y - cy) / cy;
      var tiltX = (dy * -6).toFixed(2);
      var tiltY = (dx * 6).toFixed(2);
      card.style.transform = 'rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg) translateY(-6px)';
    });
    card.addEventListener('mouseleave', function(){
      card.style.transform = '';
    });
  });

  // Highlight active nav link
  var links = document.querySelectorAll('.site-nav a');
  links.forEach(function(a){
    try{
      var url = new URL(a.href);
      if(url.pathname === location.pathname || url.pathname === location.pathname.replace(/\/$/,'')){
        a.classList.add('active');
      }
    }catch(e){}
  });

});