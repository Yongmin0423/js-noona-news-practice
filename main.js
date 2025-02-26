const API_KEY = "8b29827c21c24c2a90a7231a1761642c";
let news = [];

const getLatestNews = async () => {
  const url = new URL(
    // `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    `https://study-website-be-bbb1539aa813.herokuapp.com`
  );
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    news = data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
  }
};

getLatestNews();
