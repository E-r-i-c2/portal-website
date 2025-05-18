// Back to Top Button Functionality

// document.getElementById('back-to-top').addEventListener('click', function() {
//   window.scrollTo({ top: 0, behavior: 'smooth' });
// }); 

// Modal functionality for navigation links
function openModal(id) {
  document.getElementById(id).style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).style.display = 'none';
  document.body.style.overflow = '';
}

// Open modals on nav link click (About is now a real page, not a modal)
const modalLinks = [
  { link: 'support-link', modal: 'support-modal' },
  { link: 'careers-link', modal: 'careers-modal' },
  { link: 'login-link', modal: 'login-modal' },
  // Footer links
  { link: 'footer-support-link', modal: 'support-modal' },
  { link: 'footer-careers-link', modal: 'careers-modal' },
];
modalLinks.forEach(({ link, modal }) => {
  const el = document.getElementById(link);
  if (el) {
    el.addEventListener('click', e => {
      e.preventDefault();
      openModal(modal);
    });
  }
});

// Close modals on close button click
Array.from(document.getElementsByClassName('close')).forEach(btn => {
  btn.addEventListener('click', function() {
    closeModal(this.getAttribute('data-modal'));
  });
});

// Close modals when clicking outside modal-content
Array.from(document.getElementsByClassName('modal')).forEach(modal => {
  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModal(modal.id);
  });
});

// Close modals on Escape key
window.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal').forEach(modal => {
      if (modal.style.display === 'flex') closeModal(modal.id);
    });
  }
});

<<<<<<< Updated upstream
// --- Robust Login Modal Handler (Always Works) ---
(function() {
  function showLoginModal() {
    var modal = document.getElementById('loginModal') || document.getElementById('login-modal');
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }
  function hideLoginModal() {
    var modal = document.getElementById('loginModal') || document.getElementById('login-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }
  // Attach directly if present
  function attachLoginHandler() {
    var loginLink = document.getElementById('login-link');
    if (loginLink) {
      loginLink.onclick = function(e) {
        e.preventDefault();
        showLoginModal();
      };
    }
    // Close button
    var closeBtn = document.getElementById('closeModal');
    if (closeBtn) {
      closeBtn.onclick = function() {
        hideLoginModal();
      };
    }
    // Click outside modal content
    var modal = document.getElementById('loginModal') || document.getElementById('login-modal');
    if (modal) {
      modal.onclick = function(e) {
        if (e.target === modal) hideLoginModal();
      };
      var form = modal.querySelector('form');
      if (form) {
        form.onsubmit = function(e) {
          e.preventDefault();
          alert('Logged in! (Demo only)');
          hideLoginModal();
        };
      }
    }
  }
  // Try to attach immediately, and also on DOMContentLoaded
  attachLoginHandler();
  document.addEventListener('DOMContentLoaded', attachLoginHandler);
  // Fallback: event delegation for dynamically added login-link
  document.addEventListener('click', function(e) {
    var t = e.target;
    if (t && t.id === 'login-link') {
      e.preventDefault();
      showLoginModal();
    }
    if (t && t.id === 'closeModal') {
      hideLoginModal();
    }
  });
})(); 
=======
// Log In form (demo only)
document.querySelectorAll('.login-form').forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Logged in! (Demo only)');
    closeModal('login-modal');
  });
}); 
>>>>>>> Stashed changes
