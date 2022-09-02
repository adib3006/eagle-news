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
        .then(data => sort(data.data))
        .catch(error => console.log(error))
}

const sort = (array) =>{
    const sortedArray = array.sort(({ total_view: a }, { total_view: b }) => b - a);
    displayNews(sortedArray);
}

const displayNews = (newsList) => {
    const newsSection = document.getElementById('news-section');
    newsSection.innerHTML = ``;
    console.log(newsList.length);
    if(newsList.length > 0){
        newsList.forEach(news => {
            const fullNews = news.details;
            const shortNews = fullNews.slice(0, 350);
            //console.log(news);
            const div = document.createElement('div');
            //div.classList.add('full-screen'); **will be modified later on external css file**
            div.innerHTML = `
        <div class="card mb-3 p-3 border border-0 shadow">
                <div class="row g-0">
                    <div class="col-md-3">
                        <img src="${news.thumbnail_url}" class="img-fluid" alt="...">
                    </div>
                    
                        <div class="col-md-9">
                            <div class="card-body">
                                <h5 class="card-title pb-4">${news.title}</h5>
                                <p class="card-text pb-4">${shortNews}</p>
                                <div class="d-flex align-items-center justify-content-between">
                                    <div class="d-flex">
                                        <div class="me-2">
                                            <img src="${news.author.img}" class="img-fluid d-inline" style="height: 50px;" alt="">
                                        </div>
                                        <div>
                                            <p class="card-text mb-0"><small>${news.author.name ? news.author.name : 'No data available.'}</small></p>
                                            <p class="card-text"><small class="text-muted">${news.author.published_date}</small></p>
                                        </div>
                                    </div>
                                    <p class="card-text mb-0"><i class="fa-solid fa-eye"></i> ${news.total_view ? news.total_view : 'No data available.'}</p>
                                    <div class="d-flex">
                                        <i class="fa-solid fa-star-half-stroke"></i>
                                        <i class="fa-regular fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                    </div>
                                    <button class="btn btn-white text-secondary"><i class="fa-solid fa-arrow-right text-primary"></i></button>
                                </div>
                            </div>
                        </div>
                    
                </div>
            </div>
        `;
            newsSection.appendChild(div);
        })
    }
    else{
        const div = document.createElement('div');
        div.classList.add('text-center','text-secondary');
        div.innerHTML=`
        <h4>No News Found !</h4>
        `;
        newsSection.appendChild(div);
    }
}

loadCategories();
