// Small JS: mobile nav toggle and contact form validation
document.addEventListener('DOMContentLoaded', function(){
  // set year
  var yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // nav toggle
  var navToggle = document.getElementById('nav-toggle');
  var siteNav = document.getElementById('site-nav');
  if(navToggle && siteNav){
    navToggle.addEventListener('click', function(){
      siteNav.classList.toggle('open');
    });
  }

  // contact form validation
  var form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var name = document.getElementById('name');
      var email = document.getElementById('email');
      var message = document.getElementById('message');
      var feedback = document.getElementById('form-feedback');
      feedback.textContent = '';

      if(!name.value.trim() || !email.value.trim() || !message.value.trim()){
        feedback.style.color = 'crimson';
        feedback.textContent = 'Please fill out all fields.';
        return;
      }

      // simple email pattern
      var re = /\S+@\S+\.\S+/;
      if(!re.test(email.value)){
        feedback.style.color = 'crimson';
        feedback.textContent = 'Please enter a valid email address.';
        return;
      }

      // emulate success (no backend in this static site)
      feedback.style.color = 'green';
      feedback.textContent = 'Thanks! Your message was sent (demo).';
      form.reset();
    });
  }
});