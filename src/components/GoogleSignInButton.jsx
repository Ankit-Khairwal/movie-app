import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

const GoogleSignInButton = ({ onClick, fullWidth = true }) => {
  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={onClick}
      fullWidth={fullWidth}
      startIcon={<GoogleIcon />}
      sx={{
        borderColor: "#4285f4",
        color: "#4285f4",
        "&:hover": {
          borderColor: "#4285f4",
          backgroundColor: "rgba(66, 133, 244, 0.04)",
        },
        textTransform: "none",
        py: 1,
        mb: 2,
      }}
    >
      Continue with Google
    </Button>
  );
};

export default GoogleSignInButton;
