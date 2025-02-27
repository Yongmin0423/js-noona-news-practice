const searchIcon = document.getElementById("search-icon");
const searchBox = document.getElementById("search-box");
const menus = document.querySelectorAll(".menus a");
console.log("menus", menus);
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getWesByCategory(event))
);

const API_KEY = "8b29827c21c24c2a90a7231a1761642c";
let newsList = [];

const getLatestNews = async () => {
  const url = new URL(
    // `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`
  );
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    newsList = data.articles;
    render();
    console.log(data);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
};

getLatestNews();

const render = () => {
  let newsHTML = ``;
  newsHTML = newsList
    .map(
      (news) => `<article class="row news">
          <div class="col-lg-4 img-area">
             <img class="news-img"
                src="${
                  news.urlToImage ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
                }"  onerror="this.onerror=null; this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU'" />
          </div>
          <div class="col-lg-8">
            <h2>${news.title}</h2>
             <p>${
               news.description == null || news.description == ""
                 ? "내용없음"
                 : news.description.length > 200
                 ? news.description.substring(0, 200) + "..."
                 : news.description
             }</p>
            <div>${news.source.name || "no source"} * ${moment(
        news.publishedAt
      ).fromNow()}</div>
          </div>
        </article>`
    )
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

const getNewsByKeyWord = async (event) => {
  event.preventDefault();
  const keyword = document.getElementById("search-input").value;
  const url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}`
  );
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
};

const getWesByCategory = async (event) => {
  event.preventDefault();
  const category = event.target.textContent.toLowerCase();
  const url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}`
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log("clicked category", category);
  newsList = data.articles;
  render();
};

/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

const toggleSearchBox = () => {
  console.log("clicked");
  searchBox.classList.toggle("hidden");
};

searchIcon.addEventListener("click", toggleSearchBox);
