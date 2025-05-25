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

document.addEventListener('DOMContentLoaded', fetchGamingNews); 