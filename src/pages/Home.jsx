import { useState, useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import MovieList from "../components/MovieList";
import { getTrending, getMovies, getTVShows } from "../services/api";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTVShows, setPopularTVShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trendingData, moviesData, tvShowsData] = await Promise.all([
          getTrending("all", "day"),
          getMovies("popular"),
          getTVShows("popular"),
        ]);

        setTrending(trendingData);
        setPopularMovies(moviesData.results);
        setPopularTVShows(tvShowsData.results);
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
          Welcome to MovieFlix
        </Typography>
      </Box>

      <MovieList title="Trending Now" items={trending} loading={loading} />

      <MovieList
        title="Popular Movies"
        items={popularMovies}
        mediaType="movie"
        loading={loading}
      />

      <MovieList
        title="Popular TV Shows"
        items={popularTVShows}
        mediaType="tv"
        loading={loading}
      />
    </Container>
  );
};

export default Home;
