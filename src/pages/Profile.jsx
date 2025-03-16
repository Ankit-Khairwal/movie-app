import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  TextField,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { currentUser, updateUserProfile, logout } = useAuth();
  const [displayName, setDisplayName] = useState(
    currentUser?.displayName || ""
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setSuccess(false);
      setLoading(true);

      await updateUserProfile(currentUser, {
        displayName: displayName.trim(),
      });

      setSuccess(true);
    } catch (error) {
      setError("Failed to update profile");
      console.error("Profile update error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      setError("Failed to log out");
      console.error("Logout error:", error);
    }
  };

  if (!currentUser) {
    navigate("/login");
    return null;
  }

  return (
    <Container component="main" maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          mt: 8,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "background.paper",
        }}
      >
        <Avatar
          src={currentUser.photoURL}
          sx={{
            width: 100,
            height: 100,
            mb: 2,
            bgcolor: "primary.main",
            fontSize: "2rem",
          }}
        >
          {currentUser.displayName?.[0]?.toUpperCase() ||
            currentUser.email?.[0]?.toUpperCase()}
        </Avatar>

        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Profile
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ width: "100%", mb: 2 }}>
            Profile updated successfully!
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            value={currentUser.email}
            disabled
          />

          <TextField
            margin="normal"
            fullWidth
            label="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Update Profile"}
          </Button>

          <Button
            fullWidth
            variant="outlined"
            color="error"
            onClick={handleLogout}
            sx={{ mt: 1 }}
          >
            Log Out
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;
