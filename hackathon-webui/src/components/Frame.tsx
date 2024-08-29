// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.

// This source code is licensed under the license found in the
// LICENSE file in the root directory of this source tree.

import React, { useContext } from "react";
import * as _ from "underscore";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import Stage from "./Stage";
import ImageCard from "./ImageCard";
import { openInNewTab } from "./helpers/openInNew";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 300;
const navItems = ["Home", "About", "Contact"];

const IMAGE_NAMES = [
  "const.jpg",
  "stadium.jpg",
  "brick1.jpg",
  "site.jpg",
  "brick2.jpg",
];

const IMAGE_THUMBNAIL_PATHS = [
  "/assets/data/images/construction - thumbnail.jpg",
  "/assets/data/images/InglewoodStadiumDesktop - thumbnail.jpg",
  "/assets/data/images/brick1 - thumbnail.jpg",
  "/assets/data/images/site - thumbnail.jpg",
  "/assets/data/images/brick2 - thumbnail.jpg",
];

const Frame = (props: Props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Photos
      </Typography>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          padding: "20px",
        }}
      >
        {IMAGE_THUMBNAIL_PATHS.map((item, idx) => (
          <ImageCard
            key={item}
            idx={idx}
            imgSrc={item}
            imgName={IMAGE_NAMES[idx]}
          />
        ))}
      </Box>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <PhotoLibraryOutlinedIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: "block", fontFamily: 'Ubuntu' }}
          >
            ACC Photo Annotation
          </Typography>
          <Box sx={{ display: "block" }}>
            {/* {navItems.map((item) => (
              <Button key={item} sx={{ color: "#fff" }}>
                {item}
              </Button>
            ))} */}
            <IconButton
              size="large"
              sx={{ color: "#fff" }}
              onClick={() =>
                openInNewTab(
                  "https://github.com/adsk-haileykr/picaisso-segment-anything/tree/develop"
                )
              }
            >
              <GitHubIcon fontSize="large" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box
        component="main"
        sx={{ p: 3, display: "flex", width: "100%", height: "100%" }}
      >
        <Stage />
      </Box>
    </Box>
  );
};

export default Frame;
