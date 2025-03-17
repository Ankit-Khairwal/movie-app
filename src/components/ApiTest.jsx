import { useState, useEffect } from "react";
import { getTrending, getImageUrl } from "../services/api";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
} from "@mui/material";

export default function ApiTest() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getTrending();
        console.log("API Response:", data);
        setMovies(data || []);
        setError("");
      } catch (err) {
        console.error("Error in component:", err);
        setError("Failed to fetch data. Please check console for details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
        <Typography variant="body1">
          API Key being used:{" "}
          {import.meta.env.VITE_TMDB_API_KEY ? "Key exists" : "Key is missing"}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        API Test - Trending Movies
      </Typography>

      {movies.length === 0 ? (
        <Typography>
          No movies found. Check console for API response details.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={getImageUrl(movie.poster_path)}
                  alt={movie.title || movie.name}
                  onError={(e) => {
                    console.log("Image failed to load:", movie.poster_path);
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/300x450?text=No+Image";
                  }}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {movie.title || movie.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {movie.release_date ||
                      movie.first_air_date ||
                      "Unknown date"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
