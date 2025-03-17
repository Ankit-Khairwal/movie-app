import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  InputBase,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Container,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  Search as SearchIcon,
  Menu as MenuIcon,
  AccountCircle,
  Home,
  Movie,
  Tv,
  Whatshot,
} from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import { useAuth } from "../context/AuthContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
    minWidth: "200px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      handleMenuClose();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      if (isMobile) {
        setMobileDrawerOpen(false);
      }
    }
  };

  const menuItems = [
    { text: "Home", icon: <Home />, path: "/" },
    { text: "Movies", icon: <Movie />, path: "/movies" },
    { text: "TV Shows", icon: <Tv />, path: "/tv" },
    { text: "Trending", icon: <Whatshot />, path: "/trending" },
    { text: "API Test", icon: <SearchIcon />, path: "/api-test" },
  ];

  const drawer = (
    <Box sx={{ width: 250, bgcolor: "background.paper", height: "100%" }}>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            component={Link}
            to={item.path}
            onClick={() => setMobileDrawerOpen(false)}
          >
            <ListItemIcon sx={{ color: "primary.main" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 2 }}>
        <form onSubmit={handleSearch}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
            />
          </Search>
        </form>
      </Box>
    </Box>
  );

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate("/profile");
        }}
      >
        Profile
      </MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#111", width: "100%" }}>
        <Container
          maxWidth={false}
          sx={{ width: "100%", px: { xs: 1, sm: 2, md: 3 } }}
        >
          <Toolbar sx={{ justifyContent: "space-between", width: "100%" }}>
            {isMobile && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "flex", sm: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: { xs: ".1rem", sm: ".2rem" },
                color: "#E50914",
                textDecoration: "none",
                flexGrow: { xs: 1, md: 0 },
                fontSize: { xs: "1rem", sm: "1.25rem" },
              }}
            >
              MOVIE APP
            </Typography>

            {!isMobile && (
              <>
                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {menuItems.map((item) => (
                    <Button
                      key={item.text}
                      color="inherit"
                      component={Link}
                      to={item.path}
                      startIcon={item.icon}
                      sx={{
                        mx: 0.5,
                        fontSize: { sm: "0.875rem", md: "1rem" },
                      }}
                    >
                      {item.text}
                    </Button>
                  ))}
                </Box>

                <form
                  onSubmit={handleSearch}
                  style={{ flexGrow: 0.5, maxWidth: "300px" }}
                >
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      inputProps={{ "aria-label": "search" }}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      fullWidth
                    />
                  </Search>
                </form>
              </>
            )}

            <Box sx={{ display: "flex", ml: 1 }}>
              {currentUser ? (
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  {currentUser.photoURL ? (
                    <Avatar
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || "User"}
                      sx={{ width: 32, height: 32 }}
                    />
                  ) : (
                    <AccountCircle />
                  )}
                </IconButton>
              ) : (
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/login"
                    size={isMobile ? "small" : "medium"}
                    sx={{ whiteSpace: "nowrap" }}
                  >
                    Login
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    component={Link}
                    to="/signup"
                    size={isMobile ? "small" : "medium"}
                    sx={{ whiteSpace: "nowrap" }}
                  >
                    Sign Up
                  </Button>
                </Box>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileDrawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {drawer}
      </Drawer>

      {renderMenu}
    </>
  );
};

export default Navbar;
