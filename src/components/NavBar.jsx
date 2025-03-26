import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Add Puppy", path: "/new" },
  ];

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#0d1b2a" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontFamily: "OpenDyslexic" }}>
            Puppy Bowl
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navLinks.map((link) => (
              <Button key={link.label} color="inherit" component={Link} to={link.path}>
                {link.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: "rgba(13, 27, 42, .95)",
            color: "#fff",
            width: 200,
            fontFamily: "OpenDyslexic",
            backdropFilter: "blur(4px)",
          },
        }}
      >
        <List>
          {navLinks.map((link) => (
            <ListItem key={link.label} disablePadding>
              <ListItemButton
                component={Link}
                to={link.path}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  padding: "1rem",
                  "&:hover": {
                    backgroundColor: "#1976d2", 
                    color: "#fff",
                  },
                }}
              >
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default NavBar;
