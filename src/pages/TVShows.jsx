import { useState, useEffect } from "react";
import { Container, Typography, Box, Tabs, Tab } from "@mui/material";
import MovieList from "../components/MovieList";
import { getTVShows } from "../services/api";

const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "On The Air", value: "on_the_air" },
  { label: "Airing Today", value: "airing_today" },
];

const TVShows = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("popular");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchShows = async () => {
      setLoading(true);
      try {
        const data = await getTVShows(category, page);
        setShows(data.results);
      } catch (error) {
        console.error("Error fetching TV shows:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
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
          TV Shows
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

      <MovieList items={shows} mediaType="tv" loading={loading} />
    </Container>
  );
};

export default TVShows;
