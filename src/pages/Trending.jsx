import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import MovieList from "../components/MovieList";
import { getTrending } from "../services/api";

const timeWindows = [
  { label: "Today", value: "day" },
  { label: "This Week", value: "week" },
];

const mediaTypes = [
  { label: "All", value: "all" },
  { label: "Movies", value: "movie" },
  { label: "TV Shows", value: "tv" },
];

const Trending = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeWindow, setTimeWindow] = useState("day");
  const [mediaType, setMediaType] = useState("all");

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      try {
        const data = await getTrending(mediaType, timeWindow);
        setTrending(data);
      } catch (error) {
        console.error("Error fetching trending:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, [mediaType, timeWindow]);

  const handleTimeWindowChange = (event, newTimeWindow) => {
    if (newTimeWindow !== null) {
      setTimeWindow(newTimeWindow);
    }
  };

  const handleMediaTypeChange = (event, newMediaType) => {
    if (newMediaType !== null) {
      setMediaType(newMediaType);
    }
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
          Trending
        </Typography>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
          <ToggleButtonGroup
            value={timeWindow}
            exclusive
            onChange={handleTimeWindowChange}
            aria-label="time window"
            sx={{
              "& .MuiToggleButton-root.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              },
            }}
          >
            {timeWindows.map((option) => (
              <ToggleButton
                key={option.value}
                value={option.value}
                sx={{ color: "grey.300" }}
              >
                {option.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <ToggleButtonGroup
            value={mediaType}
            exclusive
            onChange={handleMediaTypeChange}
            aria-label="media type"
            sx={{
              "& .MuiToggleButton-root.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              },
            }}
          >
            {mediaTypes.map((option) => (
              <ToggleButton
                key={option.value}
                value={option.value}
                sx={{ color: "grey.300" }}
              >
                {option.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
      </Box>

      <MovieList items={trending} loading={loading} />
    </Container>
  );
};

export default Trending;
