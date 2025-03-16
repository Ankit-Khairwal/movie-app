import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
  Chip,
  CardActionArea,
  Skeleton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { getImageUrl } from "../services/api";

const MovieCard = ({ item, mediaType = "movie" }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!item) return null;

  const type = item.media_type || mediaType;
  const title = type === "movie" ? item.title : item.name;
  const releaseDate =
    type === "movie" ? item.release_date : item.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "";

  const handleClick = () => {
    navigate(`/${type}/${item.id}`);
  };

  const cardHeight = isMobile ? 300 : 375;

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#222",
        color: "white",
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardActionArea onClick={handleClick} sx={{ height: "100%" }}>
        {!imageLoaded && (
          <Skeleton
            variant="rectangular"
            width="100%"
            height={cardHeight}
            animation="wave"
          />
        )}
        <CardMedia
          component="img"
          height={cardHeight}
          image={
            item.poster_path
              ? getImageUrl(item.poster_path)
              : "/placeholder.jpg"
          }
          alt={title}
          onLoad={() => setImageLoaded(true)}
          sx={{
            display: imageLoaded ? "block" : "none",
            objectFit: "cover",
          }}
        />
        <CardContent sx={{ flexGrow: 1, pb: 1 }}>
          <Typography
            gutterBottom
            variant={isMobile ? "body1" : "h6"}
            component="div"
            noWrap
            sx={{ fontWeight: "bold" }}
          >
            {title}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Rating
              value={item.vote_average / 2}
              precision={0.5}
              readOnly
              size={isMobile ? "small" : "medium"}
            />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {item.vote_average ? (item.vote_average / 2).toFixed(1) : "N/A"}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {year}
            </Typography>
            <Chip
              label={type.toUpperCase()}
              size="small"
              sx={{
                backgroundColor: type === "movie" ? "#E50914" : "#0071EB",
                color: "white",
                height: 24,
                fontSize: isMobile ? "0.7rem" : "0.8rem",
              }}
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
