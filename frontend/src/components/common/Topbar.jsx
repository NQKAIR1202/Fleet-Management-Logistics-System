import { useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  TextField,
  InputAdornment,
  Badge,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  MenuItem,
} from "@mui/material";

import {
  MdNotifications,
  MdSearch,
  MdDarkMode,
} from "react-icons/md";

const drawerWidth = 260;

function Topbar() {
  // Tracks whether someone is signed in. Swap this out for real auth state
  // (context, redux, a hook, etc.) once that's wired up.
  const [user, setUser] = useState(null);

  const [authView, setAuthView] = useState(null); // "login" | "signup" | null
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" });

  const [profileAnchor, setProfileAnchor] = useState(null);

  const openLogin = () => {
    setAuthForm({ name: "", email: "", password: "" });
    setAuthView("login");
  };

  const openSignUp = () => {
    setAuthForm({ name: "", email: "", password: "" });
    setAuthView("signup");
  };

  const closeAuth = () => setAuthView(null);

  const handleFormChange = (field) => (e) =>
    setAuthForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleAuthSubmit = () => {
    // Replace this with a real API call (login or register).
    setUser({
      name: authForm.name || "Administrator",
      role: "System Manager",
    });
    closeAuth();
  };

  const handleLogout = () => {
    setUser(null);
    setProfileAnchor(null);
  };

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <Toolbar>

        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            color: "#1565C0",
            mr: 4,
          }}
        >
          Fleet Management System
        </Typography>

        <TextField
          size="small"
          placeholder="Search vehicles, drivers..."
          sx={{
            width: 320,
            bgcolor: "#F5F7FA",
            borderRadius: 2,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MdSearch />
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ flexGrow: 1 }} />

        <IconButton>
          <MdDarkMode size={22} />
        </IconButton>

        <IconButton>
          <Badge
            badgeContent={5}
            color="error"
          >
            <MdNotifications size={22} />
          </Badge>
        </IconButton>

        {user ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              ml: 2,
              gap: 1.5,
              cursor: "pointer",
            }}
            onClick={(e) => setProfileAnchor(e.currentTarget)}
          >
            <Avatar
              sx={{
                bgcolor: "#1565C0",
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </Avatar>

            <Box>
              <Typography
                fontWeight="bold"
                fontSize={14}
              >
                {user.name}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                {user.role}
              </Typography>
            </Box>

            <Menu
              anchorEl={profileAnchor}
              open={Boolean(profileAnchor)}
              onClose={() => setProfileAnchor(null)}
              onClick={(e) => e.stopPropagation()}
            >
              <MenuItem onClick={handleLogout}>Log out</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              ml: 2,
              gap: 1,
            }}
          >
            <Button
              variant="text"
              onClick={openLogin}
              sx={{ color: "#1565C0", textTransform: "none", fontWeight: 600 }}
            >
              Log in
            </Button>

            <Button
              variant="contained"
              onClick={openSignUp}
              sx={{
                bgcolor: "#1565C0",
                textTransform: "none",
                fontWeight: 600,
                boxShadow: "none",
                "&:hover": { bgcolor: "#0D47A1", boxShadow: "none" },
              }}
            >
              Sign up
            </Button>
          </Box>
        )}

      </Toolbar>

      {/* Login / Sign up dialog */}
      <Dialog open={Boolean(authView)} onClose={closeAuth} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight="bold">
          {authView === "signup" ? "Create an account" : "Log in"}
        </DialogTitle>

        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}
        >
          {authView === "signup" && (
            <TextField
              label="Full name"
              value={authForm.name}
              onChange={handleFormChange("name")}
              fullWidth
              autoFocus
            />
          )}

          <TextField
            label="Email"
            type="email"
            value={authForm.email}
            onChange={handleFormChange("email")}
            fullWidth
            autoFocus={authView === "login"}
          />

          <TextField
            label="Password"
            type="password"
            value={authForm.password}
            onChange={handleFormChange("password")}
            fullWidth
          />

          <Typography variant="body2" color="text.secondary">
            {authView === "signup" ? (
              <>
                Already have an account?{" "}
                <Box
                  component="span"
                  onClick={openLogin}
                  sx={{ color: "#1565C0", fontWeight: 600, cursor: "pointer" }}
                >
                  Log in
                </Box>
              </>
            ) : (
              <>
                Don&apos;t have an account?{" "}
                <Box
                  component="span"
                  onClick={openSignUp}
                  sx={{ color: "#1565C0", fontWeight: 600, cursor: "pointer" }}
                >
                  Sign up
                </Box>
              </>
            )}
          </Typography>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={closeAuth} sx={{ textTransform: "none" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAuthSubmit}
            sx={{
              bgcolor: "#1565C0",
              textTransform: "none",
              fontWeight: 600,
              boxShadow: "none",
              "&:hover": { bgcolor: "#0D47A1", boxShadow: "none" },
            }}
          >
            {authView === "signup" ? "Create account" : "Log in"}
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}

export default Topbar;
