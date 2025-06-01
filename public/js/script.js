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

// --- Robust Login Modal Handler (Always Works) ---
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
(function() {
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
        form.onsubmit = async function(e) {
          e.preventDefault();
          // Get username and password from form inputs
          var inputs = form.querySelectorAll('input');
          var username = inputs[0].value.trim();
          var password = inputs[1].value;
          // Simple validation
          if (!username || !password) {
            alert('Please enter both username and password.');
            return;
          }
          try {
            const res = await fetch('/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (res.ok && data.success) {
              alert('Login successful!');
              if (data.isAdmin) {
                window.isAdmin = true;
                location.reload();
              } else {
                window.isAdmin = false;
                hideLoginModal();
              }
            } else {
              alert(data.message || 'Login failed.');
            }
          } catch (err) {
            alert('Network error. Please try again.');
          }
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

// --- Sign Up Modal Handler ---
(function() {
  function showSignupModal() {
    var modal = document.getElementById('signupModal');
    // Hide both possible login modals
    var loginModal1 = document.getElementById('loginModal');
    var loginModal2 = document.getElementById('login-modal');
    if (loginModal1) loginModal1.style.display = 'none';
    if (loginModal2) loginModal2.style.display = 'none';
    if (modal) {
      // Clear form and message
      var form = document.getElementById('signupForm');
      if (form) form.reset();
      var msg = document.getElementById('signup-message');
      if (msg) { msg.textContent = ''; msg.style.color = '#e11d48'; }
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }
  function hideSignupModal() {
    var modal = document.getElementById('signupModal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }
  function setSignupMessage(msg, color) {
    var m = document.getElementById('signup-message');
    if (m) { m.textContent = msg; m.style.color = color || '#e11d48'; }
  }
  function attachSignupHandler() {
    document.addEventListener('click', function(e) {
      if (e.target && (e.target.id === 'open-signup' || e.target.id === 'open-signup2')) {
        e.preventDefault();
        hideLoginModal();
        showSignupModal();
      }
      if (e.target && e.target.id === 'closeSignupModal') {
        hideSignupModal();
      }
      if (e.target && e.target.id === 'back-to-login') {
        hideSignupModal();
        showLoginModal();
      }
    });
    var signupModal = document.getElementById('signupModal');
    if (signupModal) {
      signupModal.onclick = function(e) { if (e.target === signupModal) hideSignupModal(); };
      var form = document.getElementById('signupForm');
      if (form) {
        form.onsubmit = async function(e) {
          e.preventDefault();
          var username = document.getElementById('signup-username').value.trim();
          var password = document.getElementById('signup-password').value;
          var confirm = document.getElementById('signup-confirm').value;
          if (!username || !password || !confirm) {
            setSignupMessage('Please fill in all fields.');
            return;
          }
          if (password !== confirm) {
            setSignupMessage('Passwords do not match.');
            return;
          }
          setSignupMessage('');
          try {
            const res = await fetch('/signup', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (res.ok && data.success) {
              setSignupMessage('Sign up successful! You can now log in.', '#4ade80');
              setTimeout(() => { hideSignupModal(); showLoginModal(); }, 1200);
            } else {
              setSignupMessage(data.message || 'Sign up failed.');
            }
          } catch (err) {
            setSignupMessage('Network error. Please try again.');
          }
        };
      }
    }
  }
  document.addEventListener('DOMContentLoaded', attachSignupHandler);
})();

function updateNavbarForLogin() {
  const nav = document.querySelector('.nav-links');
  if (!nav) return;
  let loginLink = nav.querySelector('#login-link');
  let userActions = nav.querySelector('.user-actions');
  let settingsBtn = nav.querySelector('.settings-btn');
  // Always show settings button
  if (!settingsBtn) {
    settingsBtn = document.createElement('a');
    settingsBtn.className = 'settings-btn';
    settingsBtn.title = 'Settings';
    settingsBtn.href = '/settings';
    settingsBtn.style.display = 'flex';
    settingsBtn.style.alignItems = 'center';
    settingsBtn.style.justifyContent = 'center';
    settingsBtn.style.marginLeft = '12px';
    settingsBtn.innerHTML = '<svg width="22" height="22" fill="none" stroke="#e11d48" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09A1.65 1.65 0 0 0 12 3.6V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09c.36.36.59.86.59 1.41s-.23 1.05-.59 1.41z"/></svg>';
    nav.appendChild(settingsBtn);
  }
  // Remove duplicate settings buttons
  const allSettings = nav.querySelectorAll('.settings-btn');
  if (allSettings.length > 1) {
    for (let i = 1; i < allSettings.length; i++) allSettings[i].remove();
  }
  if (localStorage.getItem('isLoggedIn') === 'true') {
    if (loginLink) loginLink.style.display = 'none';
    if (!userActions) {
      userActions = document.createElement('div');
      userActions.className = 'user-actions';
      userActions.style.display = 'flex';
      userActions.style.alignItems = 'center';
      userActions.style.gap = '12px';
      // Profile picture
      const avatar = document.createElement('img');
      avatar.src = localStorage.getItem('profilePic') || 'https://www.gravatar.com/avatar/?d=mp&s=32';
      avatar.alt = 'Profile';
      avatar.className = 'nav-avatar';
      avatar.style.width = '32px';
      avatar.style.height = '32px';
      avatar.style.borderRadius = '50%';
      avatar.style.objectFit = 'cover';
      // Logout button
      const logoutBtn = document.createElement('button');
      logoutBtn.className = 'logout-btn';
      logoutBtn.textContent = 'Logout';
      logoutBtn.style.background = '#e11d48';
      logoutBtn.style.color = '#fff';
      logoutBtn.style.border = 'none';
      logoutBtn.style.borderRadius = '6px';
      logoutBtn.style.padding = '6px 16px';
      logoutBtn.style.fontWeight = '700';
      logoutBtn.style.cursor = 'pointer';
      logoutBtn.onclick = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('profilePic');
        if (loginLink) loginLink.style.display = '';
        if (userActions) userActions.remove();
        updateNavbarForLogin();
      };
      userActions.appendChild(avatar);
      userActions.appendChild(logoutBtn);
      nav.appendChild(userActions);
    }
  } else {
    if (loginLink) loginLink.style.display = '';
    if (userActions) userActions.remove();
  }
}

window.addEventListener('DOMContentLoaded', updateNavbarForLogin);

function handleLoginSuccess() {
  localStorage.setItem('isLoggedIn', 'true');
  updateNavbarForLogin();
}

// Example: Hook into your login logic
// If you use a login form, call handleLoginSuccess() after login
// For demo, you can add: document.querySelector('.login-form')?.addEventListener('submit', e => { e.preventDefault(); handleLoginSuccess(); }); 