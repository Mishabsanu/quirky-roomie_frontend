import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import PropTypes from "prop-types";
import { useState } from "react";
import { IoHome, IoPodiumOutline, IoWarningOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../../redux/auth/authSlice";
import "./Sidebar.css";
const drawerWidth = 280;

function Sidebar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = useSelector((state) => state?.auth?.current_user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/signin");
  };

  const drawer = (
    <div className="sidebar">
      <div style={{ height: "88%" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="heading">QuirkyRoomie</div>
        </Link>

        <div className="menuItems">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="menuItem">
              <IoHome className="menuIcon" />
              <span className="menuText">Dashboard</span>
            </div>
          </Link>

          <Link to="/complaints" style={{ textDecoration: "none" }}>
            <div className="menuItem">
              <IoWarningOutline className="menuIcon" />
              <span className="menuText">Complaints</span>
            </div>
          </Link>

          <Link to="/leaderboard" style={{ textDecoration: "none" }}>
            <div className="menuItem">
              <IoPodiumOutline className="menuIcon" />
              <span className="menuText">Leaderboard</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#fff",
          boxShadow: "none",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left side: Title + menu icon */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <h3 style={{ color: "#f33f40" }}>Welcome to QuirkyRoomie</h3>
          </Box>

          {/* Right side: user info */}
          {user ? (
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: "#f33f40" }}>
                {user?.username?.[0]?.toUpperCase()}
              </Avatar>
              <Typography variant="subtitle1" fontWeight="bold" color="error">
                {user?.username}
              </Typography>

              <Button variant="outlined" color="error" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate("/signin")}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

Sidebar.propTypes = {
  window: PropTypes.func,
};

export default Sidebar;
