const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsCategories(data.data.news_category))
        .catch(error => console.log(error))
}

const displayNewsCategories = (categories) => {
    categories.forEach(category => {
        console.log(category);
    })
}

loadCategories();
