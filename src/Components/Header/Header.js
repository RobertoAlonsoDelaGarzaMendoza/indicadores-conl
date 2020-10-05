import React from "react";
import "./Header.css";
import FacebookIcon from "@material-ui/icons/Facebook";
import YouTubeIcon from "@material-ui/icons/YouTube";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

function Header() {
  return (
    <AppBar position="fixed" className="Header">
      <Toolbar>
        <div className="Header_icons">
          <a href="#" className="Header_icon">
            <FacebookIcon />
          </a>
          <a href="#" className="Header_icon">
            <TwitterIcon />
          </a>
          <a href="#" className="Header_icon">
            <YouTubeIcon />
          </a>
          <a href="#" className="Header_icon">
            <LinkedInIcon />
          </a>
          <a href="#" className="Header_icon">
            <InstagramIcon />
          </a>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
