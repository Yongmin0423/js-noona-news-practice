const searchIcon = document.getElementById("search-icon");
const searchBox = document.getElementById("search-box");

const API_KEY = "8b29827c21c24c2a90a7231a1761642c";
let news = [];

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
    news = data.articles;
    console.log(data);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
};

getLatestNews();

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
