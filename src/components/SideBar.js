import {
  HelpOutline,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Notifications,
} from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  Badge,
  Divider,
  InputAdornment,
  ListSubheader,
  Stack,
  TextField,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import moment from "moment/moment";
import * as React from "react";
import logo from "../images/download.png";
import NestedList from "./NestedList";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "center",
  flexDirection: "column",
}));

export default function PersistentDrawerLeft() {
  const [open, setOpen] = React.useState(false);

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ height: 70, bgcolor: "white", color: "#51576d" }}>
          <Stack
            direction={"row"}
            gap={2}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Stack direction={"row"} gap={2} alignItems={"center"}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleToggleDrawer}
                edge="start"
                sx={{ mr: 2 }}
              >
                <Stack direction={"row"}>
                  {open ? (
                    <KeyboardArrowLeft size="sm" />
                  ) : (
                    <KeyboardArrowRight size="sm" />
                  )}{" "}
                  <MenuIcon />
                </Stack>
              </IconButton>
              <Typography noWrap component="div">
                Good Morning! {moment().format("ddd MMM DD, YYYY LT")}
              </Typography>
            </Stack>
            <Stack direction={"row"} gap={1} alignItems={"center"}>
              <IconButton>
                <HelpOutline />
              </IconButton>
              <IconButton>
                <Badge badgeContent={"9+"} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
              <Divider orientation="vertical" sx={{ mx: 1 }} />
              <Typography sx={{ color: "#050F2D", fontWeight: "bold" }}>
                Nader Amer
              </Typography>
              <Avatar
                sx={{
                  width: 28,
                  height: 28,
                  fontSize: 14,
                  color: "darkblue",
                  background: "#DBE9FE",
                }}
                color="primary"
              >
                NA
              </Avatar>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            color: "white",
            background: "#050e2d",
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <img src={logo} alt="logo"></img>
          <TextField
            sx={{
              "& ::placeholder": {
                color: "#9ea7ba",
              },
              background: "white",
              borderColor: "none",
              borderRadius: "20px 20px",
            }}
            size="small"
            placeholder="Quick access"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ color: "#555b70" }} />
                </InputAdornment>
              ),
            }}
          />
        </DrawerHeader>
        <List>
          <ListItem disablePadding sx={{ color: "#828796", paddingTop: "5px" }}>
            <ListItemButton>
              <ListItemIcon sx={{ color: "#828796" }}>
                <DashboardIcon sx={{ minWidth: "10px" }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
        </List>
        <List
          sx={{ color: "#828796", fontWeight: "bold" }}
          subheader={
            <ListSubheader
              component="div"
              id="nested-list-subheader"
              sx={{ color: "#4d5369", background: "none" }}
            >
              SETTINGS
            </ListSubheader>
          }
        >
          {[
            { title: "ATM Setting", items: ["Banking", "Salaries"] },
            { title: "Business Setup", items: ["Setup", "Business"] },
            {
              title: "User Management",
              items: ["Users", "Profiles", "Groups"],
            },
          ].map((entry) => (
            <NestedList
              title={entry.title}
              items={entry.items}
              selected={"Users"}
            />
          ))}

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="License Management" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
