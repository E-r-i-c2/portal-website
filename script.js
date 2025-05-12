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
  { link: 'news-link', modal: 'news-modal' },
  { link: 'support-link', modal: 'support-modal' },
  { link: 'careers-link', modal: 'careers-modal' },
  { link: 'login-link', modal: 'login-modal' },
  // Footer links
  { link: 'footer-news-link', modal: 'news-modal' },
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

// Log In form (demo only)
document.querySelectorAll('.login-form').forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Logged in! (Demo only)');
    closeModal('login-modal');
  });
}); 