import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {StyledCard} from "./StyledCard";
import {CardActionArea, CardContent, CardMedia, styled} from "@mui/material";

const Link = styled("a")(({theme}) => ({
  textDecoration: "none",
  color: theme.palette.text.primary,
}));

function NewsArticle(props) {
  const {image, title, description, author, publishedAt, url} = props;
  return (
    <StyledCard>
      <Link target="_blank" href={url}>
        <CardActionArea>
          {image && (
            <CardMedia component="img" height="200" image={image} alt={title} />
          )}
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <Box p={2}>
        <Typography variant="caption" color="textSecondary" display="block">
          {author}
        </Typography>
        {publishedAt && (
          <Typography variant="caption" color="textSecondary">
            {new Date(publishedAt).toLocaleDateString()}
          </Typography>
        )}
      </Box>
    </StyledCard>
  );
}

export default NewsArticle;
