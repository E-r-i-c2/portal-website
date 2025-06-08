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
function handleLoginSuccess(username) {
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('username', username);
  updateNavbarForLogin();
}

// Update updateNavbarForLogin to show username
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
    settingsBtn.innerHTML = '<img src="/img/red%20gear%20asset.jpg" alt="Settings" style="width:38px;height:38px;object-fit:contain;">';
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
      // Username
      const usernameSpan = document.createElement('span');
      usernameSpan.textContent = localStorage.getItem('username') || '';
      usernameSpan.style.color = '#fff';
      usernameSpan.style.fontWeight = '700';
      usernameSpan.style.fontSize = '1.05em';
      usernameSpan.style.marginLeft = '6px';
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
        localStorage.removeItem('username');
        if (loginLink) loginLink.style.display = '';
        if (userActions) userActions.remove();
        updateNavbarForLogin();
      };
      userActions.appendChild(avatar);
      userActions.appendChild(usernameSpan);
      userActions.appendChild(logoutBtn);
      nav.appendChild(userActions);
    }
  } else {
    if (loginLink) loginLink.style.display = '';
    if (userActions) userActions.remove();
  }
}

window.addEventListener('DOMContentLoaded', updateNavbarForLogin);

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

// Patch login modal handler to use handleLoginSuccess
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
        form.onsubmit = async function(e) {
          e.preventDefault();
          var inputs = form.querySelectorAll('input');
          var username = inputs[0].value.trim();
          var password = inputs[1].value;
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
              handleLoginSuccess(username);
              hideLoginModal();
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
  attachLoginHandler();
  document.addEventListener('DOMContentLoaded', attachLoginHandler);
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