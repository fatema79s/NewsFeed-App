import { Button, Container, styled, Typography } from "@mui/material";
import NewsHeader from "./components/NewsHeader";
import NewsFeed from "./components/NewsFeed";
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

const Footer = styled("div")(({theme}) => ({
  margin: theme.spacing(2, 0),
  display: "flex",
  justifyContent: "space-between",
}));

const PAGE_SIZE = 5;

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("general");
  const pageNumber = useRef(1);
  const queryValue = useRef("");

  async function loadData(currentCategory) {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?category=${currentCategory}&q=${
        queryValue.current
      }&page=${pageNumber.current}&pageSize=${PAGE_SIZE}&country=us&apiKey=${
        import.meta.env.VITE_NEWS_FEED_API_KEY
      }`
    );

    const data = await response.json();

    if (data.status === "error") {
      throw new Error("An error has occured");
    }

    return data.articles.map((article) => {
      const {title, description, author, publishedAt, urlToImage, url} =
        article;
      return {
        title,
        description,
        author,
        publishedAt,
        image: urlToImage,
        url,
      };
    });
  }

  const fetchAndUpdateArticles = (currentCategory) => {
    setLoading(true);
    setError("");
    loadData(currentCategory ?? category)
      .then((newData) => {
        setArticles(newData);
      })
      .catch((errorMessage) => {
        setError(errorMessage.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const debouncedLoadData = debounce(() => fetchAndUpdateArticles(), 500);

  useEffect(() => {
    fetchAndUpdateArticles();
  }, []);

  const handleSearchChange = (newQuery) => {
    pageNumber.current = 1;
    queryValue.current = newQuery;
    debouncedLoadData();
  };

  function handleNextPage() {
    pageNumber.current += 1;
    fetchAndUpdateArticles();
  }

  function handlePrevPage() {
    pageNumber.current -= 1;
    fetchAndUpdateArticles();
  }

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    pageNumber.current = 1;
    fetchAndUpdateArticles(event.target.value);
  };


  return (
    <Container>
      <NewsHeader
        category={category}
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
      />
      {error.length === 0 ? (
        <NewsFeed articles={articles} loading={loading} />
      ) : (
        <Typography color="error" align="center" marginTop={7} fontWeight={900}>
          {error}
        </Typography>
      )}
      <Footer>
        <Button
          variant="outlined"
          onClick={handlePrevPage}
          disabled={loading || pageNumber.current === 1}
        >
          Previous
        </Button>
        <Button
          variant="outlined"
          onClick={handleNextPage}
          disabled={loading || articles.length < PAGE_SIZE}
        >
          Next
        </Button>
      </Footer>
    </Container>
  );
}

export default App;
