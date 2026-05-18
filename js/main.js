document.addEventListener('DOMContentLoaded', () => {
    
    const newsGrid = document.getElementById('news-grid');
    
    if (newsGrid) { 

        fetch('data/news.xml')
            .then(response => response.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/xml")) 
            .then(data => {
                const newsItems = data.querySelectorAll('news');
                
                newsItems.forEach((item) => {
                    const imgUrl = item.querySelector('image').textContent;
                    const title = item.querySelector('title').textContent;
                    const description = item.querySelector('description').textContent;
                    const fullText = item.querySelector('fullText').textContent;

                    const card = document.createElement('article');
                    card.className = 'news-card';

                    card.innerHTML = `
                        <img src="${imgUrl}" alt="${title}">
                        <div class="news-info">
                            <h3>${title}</h3>
                            <p class="card-text">${description}</p>
                            <span class="read-more">Развернуть ↓</span>
                        </div>
                    `;
                    card.addEventListener('click', () => {
                        const textElement = card.querySelector('.card-text');
                        const readMoreBtn = card.querySelector('.read-more');

                        if (card.classList.contains('expanded')) {
                            card.classList.remove('expanded');
                            textElement.textContent = description;
                            readMoreBtn.textContent = 'Развернуть ↓';
                        } 
                        else {
                            card.classList.add('expanded');
                            textElement.textContent = fullText;
                            readMoreBtn.textContent = 'Свернуть ↑';
                        }
                    });

                    newsGrid.appendChild(card);
                });
            })
            .catch(err => console.error("Ошибка загрузки XML:", err));
    }
});