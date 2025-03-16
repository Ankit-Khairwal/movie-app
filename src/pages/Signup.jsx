import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Box,
  Alert,
  Divider,
  Paper,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import GoogleSignInButton from "../components/GoogleSignInButton";
import { Movie } from "@mui/icons-material";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup, signInWithGoogle, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      const { user } = await signup(email, password);
      await updateUserProfile(user, {
        displayName: email.split("@")[0],
      });
      navigate("/");
    } catch (error) {
      setError("Failed to create an account: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    try {
      setError("");
      setLoading(true);
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      setError("Failed to sign in with Google: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#141414",
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))",
        margin: 0,
        padding: 0,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          margin: 0,
          padding: 0,
        }}
      >
        <Paper
          elevation={12}
          sx={{
            width: "100%",
            maxWidth: "350px",
            mx: "auto",
            p: { xs: 2, sm: 4 },
            borderRadius: 2,
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Movie
              sx={{
                color: "#E50914",
                fontSize: 48,
                mb: 2,
                filter: "drop-shadow(0 2px 4px rgba(229, 9, 20, 0.3))",
              }}
            />
            <Typography
              component="h1"
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "text.primary",
                textAlign: "center",
                mb: 1,
                letterSpacing: "-0.5px",
                fontSize: { xs: "1.5rem", sm: "2rem" },
              }}
            >
              Create Account
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                textAlign: "center",
                mb: 2,
                maxWidth: "90%",
                fontWeight: 400,
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
            >
              Join our movie community today
            </Typography>
          </Box>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 4,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <GoogleSignInButton onClick={handleGoogleSignIn} />
            <Divider
              sx={{
                my: 3,
                width: "100%",
                "&::before, &::after": {
                  borderColor: "rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <Typography
                color="text.secondary"
                sx={{ px: 2, fontWeight: 500 }}
              >
                or create with email
              </Typography>
            </Divider>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1,
                },
                "& .MuiInputLabel-root": {
                  textAlign: "center",
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1,
                },
                "& .MuiInputLabel-root": {
                  textAlign: "center",
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password-confirm"
              label="Confirm Password"
              type="password"
              id="password-confirm"
              autoComplete="new-password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1,
                },
                "& .MuiInputLabel-root": {
                  textAlign: "center",
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.5,
                fontSize: { xs: "0.9rem", sm: "1rem" },
                fontWeight: 600,
                textTransform: "none",
                bgcolor: "#E50914",
                borderRadius: 1,
                "&:hover": {
                  bgcolor: "#b2070f",
                },
                transition: "all 0.2s ease-in-out",
                boxShadow: "0 2px 8px rgba(229, 9, 20, 0.3)",
              }}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>

            <Box sx={{ mt: 4, textAlign: "center", width: "100%" }}>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Already have an account?{" "}
                <Link
                  component={RouterLink}
                  to="/login"
                  sx={{
                    color: "#E50914",
                    textDecoration: "none",
                    fontWeight: 600,
                    "&:hover": {
                      textDecoration: "underline",
                      color: "#b2070f",
                    },
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  Sign In
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
