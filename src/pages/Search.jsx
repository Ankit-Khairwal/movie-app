import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";
import MovieList from "../components/MovieList";
import { searchMulti } from "../services/api";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      setLoading(true);
      try {
        const data = await searchMulti(query);
        setResults(data.results);
      } catch (error) {
        console.error("Error searching:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: 1,
            fontWeight: "bold",
            color: "white",
          }}
        >
          Search Results
        </Typography>
        {query && (
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              color: "grey.500",
            }}
          >
            Showing results for "{query}"
          </Typography>
        )}
      </Box>

      {results.length > 0 ? (
        <MovieList items={results} loading={loading} />
      ) : (
        !loading &&
        query && (
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              color: "grey.500",
              mt: 8,
            }}
          >
            No results found for "{query}"
          </Typography>
        )
      )}
    </Container>
  );
};

export default Search;
