import { useState, useEffect } from "react";
import { Container, Typography, Box, Tabs, Tab } from "@mui/material";
import MovieList from "../components/MovieList";
import { getMovies } from "../services/api";

const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Now Playing", value: "now_playing" },
  { label: "Upcoming", value: "upcoming" },
];

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("popular");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data = await getMovies(category, page);
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category, page]);

  const handleCategoryChange = (event, newValue) => {
    setCategory(newValue);
    setPage(1);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: 3,
            fontWeight: "bold",
            color: "white",
          }}
        >
          Movies
        </Typography>

        <Tabs
          value={category}
          onChange={handleCategoryChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            mb: 3,
            "& .MuiTab-root": {
              color: "grey.500",
              "&.Mui-selected": {
                color: "primary.main",
              },
            },
          }}
        >
          {categories.map((cat) => (
            <Tab key={cat.value} label={cat.label} value={cat.value} />
          ))}
        </Tabs>
      </Box>

      <MovieList items={movies} mediaType="movie" loading={loading} />
    </Container>
  );
};

export default Movies;
