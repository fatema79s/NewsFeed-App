
import { Typography } from "@mui/material";
import NewsArticle from "./NewsArticle";
import LoadingArticle from "./LoadingArticle";

function NewsFeed(props) {
  const {articles, loading} = props;

  if (!loading && !articles.length) {
    return (
      <Typography
        align="center"
        variant="h6"
        color="textSecondary"
        marginTop={4}
      >
        No articles found.
      </Typography>
    );
  }

  return (
    <div>
      {loading && [...Array(5)].map((_, index) => <LoadingArticle key={index} />)}
      {!loading && articles.map((article) => (
        <NewsArticle key={JSON.stringify(article)} {...article} />
      ))}
    </div>
  );
}

export default NewsFeed;
