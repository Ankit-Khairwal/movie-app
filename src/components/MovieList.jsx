import { Grid, Typography, Box, Skeleton } from "@mui/material";
import MovieCard from "./MovieCard";

const MovieList = ({ title, items, mediaType, loading = false }) => {
  const renderSkeletons = () => {
    return Array(6)
      .fill(0)
      .map((_, index) => (
        <Grid item xs={6} sm={4} md={3} lg={2} key={`skeleton-${index}`}>
          <Box sx={{ maxWidth: 250 }}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={375}
              animation="wave"
            />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton width="80%" height={30} />
              <Skeleton width="60%" />
            </Box>
          </Box>
        </Grid>
      ));
  };

  return (
    <Box sx={{ my: 4 }}>
      {title && (
        <Typography
          variant="h5"
          component="h2"
          sx={{
            mb: 2,
            fontWeight: "bold",
            color: "white",
            borderLeft: "4px solid #E50914",
            pl: 2,
          }}
        >
          {title}
        </Typography>
      )}

      <Grid container spacing={2}>
        {loading
          ? renderSkeletons()
          : items?.map((item) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={item.id}>
                <MovieCard item={item} mediaType={mediaType} />
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default MovieList;
