import { useContext, useState } from "react";

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
    CircularProgress,
    Snackbar,
    Alert,
} from "@mui/material";

import {
    MdNotifications,
    MdSearch,
    MdDarkMode,
    MdLightMode,
    MdLogout,
    MdVisibility,
    MdVisibilityOff,
} from "react-icons/md";

import ColorModeContext from "../../context/ColorModeContext";
import { login } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";


const drawerWidth = 260;

function Topbar() {


    const {

        mode,

        toggleColorMode,

    } = useContext(ColorModeContext);

    const {

        user,

        login: authLogin,

        logout: authLogout,

    } = useAuth();

    const displayName =
        user?.FullName || user?.name || "";

    const displayRole =
        user?.Role || user?.role || "";



    const [authView, setAuthView] = useState(null);

    // login | signup | null

    const [authForm, setAuthForm] = useState({

        name: "",

        email: "",

        password: "",

    });



    const [profileAnchor, setProfileAnchor] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [snackbar, setSnackbar] = useState({

        open: false,

        severity: "success",

        message: "",

    });




    function openLogin() {

        setShowPassword(false);

        setAuthForm({

            name: "",

            email: "",

            password: "",

        });

        setAuthView("login");

    }


    function openSignup() {

       setShowPassword(false);

        setAuthForm({

            name: "",

            email: "",

            password: "",

        });

        setAuthView("signup");

    }


    function closeDialog() {

        setAuthView(null);

    }


        function showSnackbar(message, severity = "success") {

        setSnackbar({

            open: true,

            message,

            severity,

        });

    }



    function handleFormChange(field) {

        return (event) => {

            setAuthForm((prev) => ({

                ...prev,

                [field]: event.target.value,

            }));

        };

    }

      const handleAuthSubmit = async () => {

    setLoading(true);

    try {

        const result = await login({

            email: authForm.email,

            password: authForm.password,

        });

        authLogin(

            result.user,

            result.access_token,

        );

        closeDialog();

    }

    catch(err){

        showSnackbar(

            err.message,

            "error"

        );

    }

    finally{

        setLoading(false);

    }

};


    const handleLogout = () => {

    authLogout();

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
                bgcolor: "background.paper",
                borderBottom: 1,
                borderColor: "divider",
                backdropFilter: "blur(10px)",
            }}
        >

            <Toolbar
                sx={{
                    minHeight: 72,
                    px: 3,
                }}
            >
                
                <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{
                        color: "primary.main",
                        mr: 4,
                        whiteSpace: "nowrap",
                        userSelect: "none",
                    }}
                >

                 🚚 Fleet Management System

                </Typography>

                

                <Box sx={{ flexGrow: 1 }} />

                <IconButton
                    color="inherit"
                    onClick={toggleColorMode}
                    sx={{

                        mr: 1,

                        color: "text.secondary",

                        transition: ".25s",

                        "&:hover": {

                            bgcolor: "action.hover",

                            transform: "rotate(180deg)",

                        },

                    }}
                >

                    {

                        mode === "light"

                            ?

                            <MdDarkMode size={22} />

                            :

                            <MdLightMode size={22} />

                    }

                </IconButton>

                <IconButton
                    color="inherit"
                    sx={{

                        mr: 2,

                        color: "text.secondary",

                        "&:hover": {

                            bgcolor: "action.hover",

                        },

                    }}
                >

                    <Badge
                        badgeContent={5}
                        color="error"
                    >

                        <MdNotifications size={22} />

                    </Badge>

                </IconButton>

                {

                    user

                        ?

                        (

                            <Box
                                onClick={(event) =>
                                    setProfileAnchor(event.currentTarget)
                                }
                                sx={{

                                    display: "flex",

                                    alignItems: "center",

                                    gap: 1.5,

                                    px: 1.5,

                                    py: 0.75,

                                    borderRadius: 3,

                                    cursor: "pointer",

                                    transition: ".25s",

                                    "&:hover": {

                                        bgcolor: "action.hover",

                                    },

                                }}
                            >

                                <Avatar
                                    sx={{
                                        bgcolor: "primary.main",
                                        width: 42,
                                        height: 42,
                                        fontWeight: 700,
                                    }}
                                >

                                    {displayName?.charAt(0).toUpperCase()}

                                </Avatar>

                                <Box>

                                    <Typography
                                        fontWeight={700}
                                        fontSize={14}
                                    >

                                        {displayName}

                                    </Typography>

                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >

                                        {displayRole}

                                    </Typography>

                                </Box>

                            </Box>

                        )

                        :

                        (

                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 1.5,
                                }}
                            >

                                <Button
                                    variant="text"
                                    onClick={openLogin}
                                    sx={{
                                        textTransform: "none",
                                        fontWeight: 700,
                                        px: 3,
                                    }}
                                >

                                    Log in

                                </Button>

                    

                            </Box>

                        )

                }

            </Toolbar>
           
            <Menu
                anchorEl={profileAnchor}
                open={Boolean(profileAnchor)}
                onClose={() => setProfileAnchor(null)}
                PaperProps={{
                    elevation: 8,
                    sx: {
                        mt: 1.5,
                        minWidth: 220,
                        borderRadius: 3,
                    },
                }}
            >

                <MenuItem
        onClick={handleLogout}
    >

        <MdLogout
            style={{
                marginRight:12,
            }}
        />

        Logout

    </MenuItem>

            </Menu>
            <Dialog
                open={Boolean(authView)}
                onClose={closeDialog}
                maxWidth="xs"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 4,
                        p: 1,
                    },
                }}
            >

                <DialogTitle
                    sx={{
                        fontWeight: 700,
                        pb: 1,
                    }}
                >

                    {

                        authView === "signup"

                            ?

                            "Create your account"

                            :

                            "Welcome back"

                    }

                </DialogTitle>

                <DialogContent
                    sx={{

                        display: "flex",

                        flexDirection: "column",

                        gap: 2.5,

                        pt: 2,

                    }}
                >

                    {

                        authView === "signup"

                        &&

                        <TextField

                            label="Full Name"

                            value={authForm.name}

                            onChange={handleFormChange("name")}

                            fullWidth

                        />

                    }

                    <TextField

                        label="Email"

                        type="email"

                        value={authForm.email}

                        onChange={handleFormChange("email")}

                        fullWidth

                        autoFocus={
                            authView === "login"
                        }

                    />

                    <TextField
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      value={authForm.password}
                      onChange={handleFormChange("password")}
                      fullWidth
                      slotProps={{
                          input: {
                              endAdornment: (
                                  <InputAdornment position="end">
                                      <IconButton
                                          edge="end"
                                          onClick={() => setShowPassword((prev) => !prev)}
                                      >
                                          {showPassword ? (
                                              <MdVisibilityOff size={22} />
                                          ) : (
                                              <MdVisibility size={22} />
                                          )}
                                      </IconButton>
                                  </InputAdornment>
                              ),
                          },
                      }}
                  />

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >

                        {

                            authView === "signup"

                                ?

                                <>

                                    Already have an account?

                                    {" "}

                                    <Box
                                        component="span"
                                        onClick={openLogin}
                                        sx={{
                                            color: "primary.main",
                                            fontWeight: 700,
                                            cursor: "pointer",

                                            "&:hover": {
                                                textDecoration: "underline",
                                            },
                                        }}
                                    >

                                        Log in

                                    </Box>

                                </>

                                :

                                <>

                                    Don't have an account?

                                        <Box
                                            component="span"
                                            sx={{
                                                color: "primary.main",
                                                fontWeight: 700,
                                            }}
                                        >
                                            Please contact the administrator.
                                        </Box>

                                        <Typography
                                            variant="body2"
                                            sx={{
                                                mt: 1,
                                                color: "text.secondary",
                                            }}
                                        >
                                            📧 nqkair1202@gmail.com
                                            <br />
                                            📞 0908501202
                                        </Typography>

                                </>

                        }

                    </Typography>

                </DialogContent>
                                <DialogActions
                    sx={{
                        px: 3,
                        pb: 3,
                        pt: 1,
                    }}
                >

                    <Button
                        onClick={closeDialog}
                        sx={{
                            textTransform: "none",
                            fontWeight: 600,
                        }}
                    >

                        Cancel

                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleAuthSubmit}
                        disabled={loading}
                        sx={{

                            textTransform: "none",

                            fontWeight: 700,

                            borderRadius: 2,

                            px: 3,

                            boxShadow: "none",

                            "&:hover": {

                                boxShadow: "none",

                            },

                        }}
                    >

                        {
                          loading

                          ?

                          <CircularProgress
                              size={22}
                              color="inherit"
                          />

                          :

                          authView === "signup"

                          ?

                          "Create Account"

                          :

                          "Log In"

                        }

                    </Button>

                </DialogActions>

            </Dialog>

            <Snackbar
              open={snackbar.open}
              autoHideDuration={3000}
              onClose={() =>
                  setSnackbar((prev) => ({
                      ...prev,
                      open: false,
                  }))
              }
              anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
              }}
          >

              <Alert
                  severity={snackbar.severity}
                  variant="filled"
                  onClose={() =>
                      setSnackbar((prev) => ({
                          ...prev,
                          open: false,
                      }))
                  }
              >

                  {snackbar.message}

              </Alert>

          </Snackbar>

        </AppBar>

    );

}

export default Topbar;