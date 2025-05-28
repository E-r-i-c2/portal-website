// Fetch and display live gaming news about releases and player achievements
async function fetchGamingNews() {
  const feed = document.getElementById('news-feed');
  feed.innerHTML = '<div class="news-loading" style="color:#bbb;font-size:1.2em;">Loading news...</div>';

  try {
    // Use the assistant's web_search tool to get news
    const response = await fetch('https://newsapi.org/v2/everything?q=gaming%20release%20OR%20player%20achievement&language=en&sortBy=publishedAt&pageSize=8&apiKey=YOUR_NEWSAPI_KEY');
    const data = await response.json();
    if (!data.articles || data.articles.length === 0) {
      feed.innerHTML = '<div style="color:#e11d48;font-weight:700;">No news found. Try again later.</div>';
      return;
    }
    feed.innerHTML = '';
    data.articles.forEach(article => {
      const card = document.createElement('div');
      card.className = 'game-card';
      card.style.marginBottom = '32px';
      card.style.background = '#18181c';
      card.style.boxShadow = '0 2px 12px #0006';
      card.style.borderRadius = '14px';
      card.style.overflow = 'hidden';
      card.style.display = 'flex';
      card.style.flexDirection = 'row';
      card.style.alignItems = 'stretch';
      card.style.textDecoration = 'none';
      card.style.color = '#fff';
      card.onclick = () => window.open(article.url, '_blank');

      if (article.urlToImage) {
        const img = document.createElement('img');
        img.src = article.urlToImage;
        img.alt = article.title;
        img.style.width = '160px';
        img.style.height = '120px';
        img.style.objectFit = 'cover';
        img.style.flexShrink = '0';
        card.appendChild(img);
      }
      const content = document.createElement('div');
      content.style.padding = '18px 20px';
      content.style.flex = '1';
      content.innerHTML = `
        <div style="font-size:1.2em;font-weight:800;color:#e11d48;margin-bottom:6px;">${article.title}</div>
        <div style="font-size:1em;color:#e5e5e5;margin-bottom:8px;">${article.description || ''}</div>
        <div style="font-size:0.95em;color:#bbb;">${article.source.name} &middot; ${new Date(article.publishedAt).toLocaleDateString()}</div>
      `;
      card.appendChild(content);
      feed.appendChild(card);
    });
  } catch (err) {
    feed.innerHTML = '<div style="color:#e11d48;font-weight:700;">Failed to load news. Please try again later.</div>';
  }
}

// Fetch and display local news articles
async function fetchLocalNews() {
  const feed = document.getElementById('news-feed');
  const localNewsDiv = document.getElementById('local-news');
  if (!localNewsDiv) return;
  try {
    const res = await fetch('/api/news');
    const news = await res.json();
    localNewsDiv.innerHTML = '';
    if (Array.isArray(news) && news.length > 0) {
      news.forEach(article => {
        const art = document.createElement('article');
        art.className = 'news-article';
        art.style.background = '#23232b';
        art.style.padding = '32px 24px';
        art.style.borderRadius = '14px';
        art.style.boxShadow = '0 2px 12px #0006';
        art.style.margin = '24px auto';
        art.style.maxWidth = '600px';
        art.style.width = '100%';
        art.style.color = '#fff';
        art.innerHTML = `
          <h2 style="color:#e11d48;margin-bottom:10px;">${article.title}</h2>
          <p style="color:#e5e5e5;white-space:pre-line;">${article.content}</p>
          <div style="font-size:0.95em;color:#888;margin-top:18px;">Posted on: ${new Date(article.date).toLocaleDateString()}</div>
        `;
        localNewsDiv.appendChild(art);
      });
    }
  } catch (err) {
    localNewsDiv.innerHTML = '<div style="color:#e11d48;font-weight:700;">Failed to load local news.</div>';
  }
}

// Show the news creation form only when the button is clicked
function setupNewsAddButton() {
  const localNewsDiv = document.getElementById('local-news');
  if (!localNewsDiv) return;
  // Remove any existing form
  const existingForm = document.getElementById('admin-news-form');
  if (existingForm) existingForm.remove();
  // Remove any existing button
  const existingBtn = document.getElementById('show-news-form-btn');
  if (existingBtn) existingBtn.remove();
  // Create the button
  const btn = document.createElement('button');
  btn.id = 'show-news-form-btn';
  btn.textContent = 'Add News Article';
  btn.className = 'hero-btn';
  btn.style.margin = '24px auto 0 auto';
  btn.style.display = 'block';
  btn.onclick = function() {
    btn.style.display = 'none';
    showNewsFormWithCancel();
  };
  localNewsDiv.prepend(btn);
}

function showNewsFormWithCancel() {
  const localNewsDiv = document.getElementById('local-news');
  if (!localNewsDiv) return;
  const form = document.createElement('form');
  form.id = 'admin-news-form';
  form.style.background = '#18181c';
  form.style.padding = '28px 20px';
  form.style.borderRadius = '14px';
  form.style.boxShadow = '0 2px 12px #0006';
  form.style.maxWidth = '600px';
  form.style.margin = '32px auto 0 auto';
  form.style.width = '100%';
  form.innerHTML = `
    <h2 style="color:#e11d48;margin-bottom:10px;">Create News Article</h2>
    <input type="text" id="news-title" placeholder="Title" style="width:100%;margin-bottom:14px;padding:10px 12px;border-radius:6px;border:none;background:#23232b;color:#fff;font-size:1.1em;" required>
    <textarea id="news-content" placeholder="Content" style="width:100%;min-height:100px;margin-bottom:14px;padding:10px 12px;border-radius:6px;border:none;background:#23232b;color:#fff;font-size:1.08em;resize:vertical;" required></textarea>
    <div style="display:flex;gap:12px;">
      <button type="submit" class="hero-btn" style="flex:1;">Publish</button>
      <button type="button" id="cancel-news-form" class="hero-btn" style="flex:1;background:#23232b;color:#e11d48;border:1px solid #e11d48;">Cancel</button>
    </div>
    <div id="news-form-message" style="margin-top:10px;font-size:1em;"></div>
  `;
  form.onsubmit = async function(e) {
    e.preventDefault();
    const title = document.getElementById('news-title').value.trim();
    const content = document.getElementById('news-content').value.trim();
    const msg = document.getElementById('news-form-message');
    if (!title || !content) {
      msg.textContent = 'Title and content are required.';
      msg.style.color = '#e11d48';
      return;
    }
    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        msg.textContent = 'News article published!';
        msg.style.color = '#4ade80';
        form.reset();
        fetchLocalNews();
        setTimeout(() => {
          form.remove();
          setupNewsAddButton();
        }, 800);
      } else {
        msg.textContent = data.message || 'Failed to publish.';
        msg.style.color = '#e11d48';
      }
    } catch (err) {
      msg.textContent = 'Network error.';
      msg.style.color = '#e11d48';
    }
  };
  form.querySelector('#cancel-news-form').onclick = function() {
    form.remove();
    setupNewsAddButton();
  };
  localNewsDiv.prepend(form);
}

// On DOMContentLoaded, show add button, then fetch local news, then fetch external news
window.addEventListener('DOMContentLoaded', () => {
  // Add a div for local news
  let localNewsDiv = document.getElementById('local-news');
  if (!localNewsDiv) {
    localNewsDiv = document.createElement('div');
    localNewsDiv.id = 'local-news';
    const main = document.querySelector('main');
    if (main) main.insertBefore(localNewsDiv, main.children[2] || null);
  }
  setupNewsAddButton();
  fetchLocalNews();
  fetchGamingNews();
}); 