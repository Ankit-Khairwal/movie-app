import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Grid,
  Rating,
  Chip,
  Button,
  Dialog,
  DialogContent,
  CircularProgress,
} from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { getDetails, getVideos, getImageUrl } from "../services/api";

const Details = () => {
  const { mediaType, id } = useParams();
  const [details, setDetails] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openTrailer, setOpenTrailer] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const [detailsData, videosData] = await Promise.all([
          getDetails(id, mediaType),
          getVideos(id, mediaType),
        ]);
        setDetails(detailsData);
        setVideos(videosData);
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, mediaType]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!details) {
    return (
      <Container>
        <Typography
          variant="h5"
          sx={{ color: "grey.500", textAlign: "center", mt: 8 }}
        >
          Content not found
        </Typography>
      </Container>
    );
  }

  const title = mediaType === "movie" ? details.title : details.name;
  const releaseDate =
    mediaType === "movie" ? details.release_date : details.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "";
  const trailer = videos.find((video) => video.type === "Trailer") || videos[0];

  return (
    <Box>
      {/* Backdrop */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "300px", md: "500px" },
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(${getImageUrl(
            details.backdrop_path,
            "original"
          )})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          mb: 4,
        }}
      >
        <Container
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "flex-end",
            pb: 4,
          }}
        >
          <Grid container spacing={4} alignItems="flex-end">
            <Grid item xs={12} md={3}>
              <Box
                component="img"
                src={getImageUrl(details.poster_path)}
                alt={title}
                sx={{
                  width: "100%",
                  borderRadius: 1,
                  boxShadow: 3,
                }}
              />
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography
                variant="h3"
                component="h1"
                sx={{ color: "white", mb: 2 }}
              >
                {title} {year && `(${year})`}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                <Rating
                  value={details.vote_average / 2}
                  precision={0.5}
                  readOnly
                />
                <Typography variant="body1" sx={{ color: "grey.400", ml: 1 }}>
                  {(details.vote_average / 2).toFixed(1)} ({details.vote_count}{" "}
                  votes)
                </Typography>
                {details.genres?.map((genre) => (
                  <Chip
                    key={genre.id}
                    label={genre.name}
                    size="small"
                    sx={{ ml: 1 }}
                  />
                ))}
              </Box>

              {trailer && (
                <Button
                  variant="contained"
                  startIcon={<PlayArrow />}
                  onClick={() => setOpenTrailer(true)}
                  sx={{ mb: 2 }}
                >
                  Watch Trailer
                </Button>
              )}

              <Typography variant="body1" sx={{ color: "grey.300" }}>
                {details.overview}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Trailer Dialog */}
      <Dialog
        open={openTrailer}
        onClose={() => setOpenTrailer(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent sx={{ p: 0, backgroundColor: "black" }}>
          {trailer && (
            <Box sx={{ position: "relative", paddingTop: "56.25%" }}>
              <iframe
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Trailer"
                allowFullScreen
              />
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Details;
