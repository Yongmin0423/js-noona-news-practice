// 변수 선언
const searchIcon = document.getElementById("search-icon");
const searchBox = document.getElementById("search-box");
const menus = document.querySelectorAll(".menus a");
const API_KEY = "8b29827c21c24c2a90a7231a1761642c";
let newsList = [];
let url;
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 4;

//공용 함수
const getNews = async () => {
  try {
    url.searchParams.set("page", page);
    url.searchParams.set("pageSize", pageSize);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    if (data.articles.length === 0) {
      throw new Error("No result for this search");
    }
    newsList = data.articles;
    totalResults = data.totalResults;
    render();
    paginationRender();
  } catch (error) {
    console.error("Error fetching news:", error);
    errorRender(error.message);
  }
};

// 카테고리
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getWesByCategory(event))
);

const getWesByCategory = async (event) => {
  event.preventDefault();
  const category = event.target.textContent.toLowerCase();
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}`
  );
  getNews();
};

// 최신 뉴스 불러오기
const getLatestNews = async () => {
  url = new URL(
    // `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`
  );
  getNews();
};
getLatestNews();

//자료 렌더링
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

// 페이지네이션
const paginationRender = () => {
  const pageGroup = Math.ceil(page / groupSize);
  const lastPage = pageGroup * groupSize;
  const totalPages = totalResults / pageSize;
  if (lastPage > totalPages) {
    lastPage = totalPages;
  }
  const firstPage = lastPage - (groupSize - 1);
  let paginationHTML = `    <li class="page-item ${
    page === 1 ? "disabled" : ""
  }" onclick="moveToPage(${page - 1})"><a class="page-link">Previous</a></li>`;

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `<li class="page-item ${
      i === page ? "active" : ""
    }" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
    document.querySelector(".pagination").innerHTML = paginationHTML;
  }

  paginationHTML += `<li class="page-item" onclick="moveToPage(${
    page + 1
  })"><a class="page-link ${
    page === totalPages ? "disabled" : ""
  }" href="#">Next</a></li>`;
  document.querySelector(".pagination").innerHTML = paginationHTML;
};

const moveToPage = (event) => {
  page = event;
  getNews();
};

// 경고창
const errorRender = (message) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
  ${message}
</div>`;

  document.getElementById("news-board").innerHTML = errorHTML;
};

// 검색기능
const getNewsByKeyWord = async (event) => {
  event.preventDefault();
  const keyword = document.getElementById("search-input").value;
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}`
  );
  getNews();
};

//사이드 바 열기 / 닫기
/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
// 검색창 보이기 / 안 보이기
const toggleSearchBox = () => {
  console.log("clicked");
  searchBox.classList.toggle("hidden");
};

searchIcon.addEventListener("click", toggleSearchBox);
