const apikey = '{pass yours key}';

const blogContainer = document.getElementById('blog-container');
const searchField = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');



async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=30&apikey=${apikey}`
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (err) {
    console.error("Error Fetching Random News", err);
    return []
  }
}

searchButton.addEventListener("click",async()=>{
  const searchQuery = searchField.value.trim();
  if(searchQuery !== ""){
    try {
      const articles = await fetchNewsQuery(searchQuery)
      displayBlogs(articles)

      
    } catch (error) {
      console.log("Error Fetching news by searchquery",error)
    }
  }
})

async function fetchNewsQuery(searchQuery){
   try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${searchQuery}&pageSize=30&apikey=${apikey}`
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (err) {
    console.error("Error Fetching Random News", err);
    return []
  }
}




function displayBlogs(articles) {
  blogContainer.innerHTML = "";
  articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;
    const title = document.createElement("h2");
    const truncatedTitle = article.title.length>30 ? article.title.slice(0,30) + "....." :article.title;
    title.textContent = truncatedTitle;

    const description = document.createElement("p");
    let truncatedDescription = article.description;
    if (truncatedDescription && truncatedDescription.length > 120) {
      truncatedDescription = truncatedDescription.slice(0, 120) + ".....";
    }
    description.textContent = truncatedDescription;

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogCard.addEventListener('click',()=>{
      window.open(article.url,"_blank");
    })
    blogContainer.appendChild(blogCard);
  })
};


(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch (error) {
    console.error("Error Fetching random news", error);
  }
})();