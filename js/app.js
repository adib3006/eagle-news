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
        const link = document.createElement('button');
        link.classList.add('btn', 'btn-light', 'text-secondary', 'text-center');
        link.innerHTML = `
        <p class="mb-0" onclick="loadNews('${url}','${category.category_name}')">${category.category_name}</p>
        `;
        categoriesField.appendChild(link);
    })
}

const loadNews = (URL,categoryName) => {
    toggleSpinner(true);
    fetch(URL)
        .then(res => res.json())
        .then(data => sort(data.data,categoryName))
        .catch(error => console.log(error))
}

const sort = (array,categoryName) =>{
    const sortedArray = array.sort(({ total_view: a }, { total_view: b }) => b - a);
    displayNews(sortedArray,categoryName);
}

const displayNews = (newsList,categoryName) => {
    const newsSection = document.getElementById('news-section');
    const newsCount = document.getElementById('total-news-count');
    newsSection.innerHTML = ``;
    newsCount.innerHTML = ``;
    const p = document.createElement('p');
    p.innerText = `${newsList.length} items found for category ${categoryName}`;
    newsCount.appendChild(p);
    if(newsList.length > 0){
        newsList.forEach(news => {
            const fullNews = news.details;
            let newsDetail = '';
            if(fullNews.length > 350){
                newsDetail = fullNews.slice(0, 350) + "&hellip;";
            }
            else{
                newsDetail = fullNews;
            }
            const div = document.createElement('div');
            div.innerHTML = `
                <div class="card mb-3 p-3 border border-0 shadow">
                    <div class="row g-0">
                        <div class="col-12 col-lg-3 text-center">
                            <img src="${news.thumbnail_url}" class="img-fluid" alt="...">
                        </div>
                        
                            <div class="col-12 col-lg-9">
                                <div class="card-body">
                                    <h5 class="card-title pb-4">${news.title}</h5>
                                    <p class="card-text pb-4">${newsDetail}</p>
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
                                        <button onclick="loadNewsDetails('${news._id}')" class="btn btn-white text-secondary" data-bs-toggle="modal" data-bs-target="#newsDetailModal"><i class="fa-solid fa-arrow-right text-primary"></i></button>
                                    </div>
                                </div>
                            </div>

                    </div>
                </div>
            `;
            newsSection.appendChild(div);
        });
        toggleSpinner(false);
    }
    else{
        const div = document.createElement('div');
        div.classList.add('text-center','text-secondary');
        div.innerHTML=`
        <h4>No News Found !</h4>
        `;
        newsSection.appendChild(div);
        toggleSpinner(false);
    }
}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

const loadNewsDetails = id =>{
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsDetails(data.data[0]))
        .catch(error => console.log(error))
}

const displayNewsDetails = news => {
    console.log(news);
    const modalTitle = document.getElementById('newsDetailModalLabel');
    modalTitle.innerText = news.title;
    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML = `
    <img src="${news.image_url}" class="img-fluid" alt="...">
    <h6 class="pt-2">Label: ${news.others_info.is_todays_pick ? 'Latest news !' : 'Previous news.'}</h6>
    <p>Read Full News: ${news.details}</p>
    <p class="pt-2">Status: ${news.others_info.is_trending ? 'This is a trending news !' : 'Not trending now.'}</p>
    <p>Author: ${news.author.name ? news.author.name : 'No data available.'}</p>
    <p>Rating by Readers: ${news.rating.number ? news.rating.number : 'No data available.'}</p>
    <p>Badge: ${news.rating.badge ? news.rating.badge : 'No data available.'}</p>
    `;
}

loadCategories();
