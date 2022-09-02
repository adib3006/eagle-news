const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsCategories(data.data.news_category))
        .catch(error => console.log(error))
}

const displayNewsCategories = (categories) => {
    categories.forEach(category => {
        const categoriesField = document.getElementById('categories-section');
        const url = `https://openapi.programming-hero.com/api/news/category/${category.category_id}`;
        //console.log(category);
        const link = document.createElement('button');
        link.classList.add('btn', 'btn-light', 'text-secondary', 'text-center');
        link.innerHTML = `
        <p class="mb-0" onclick="loadNews('${url}')">${category.category_name}</p>
        `;
        categoriesField.appendChild(link);
    })
}

const loadNews = (url) => {
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))
        .catch(error => console.log(error))
}

const displayNews = (newsList) => {
    newsList.forEach(news => {
        console.log(news);
    })
}

loadCategories();
