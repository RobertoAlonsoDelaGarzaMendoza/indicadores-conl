import React from 'react';
import './Header.css';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';

function Header() {
    return (
        <div className="Header">
            <a className="Header_icons"><FacebookIcon/></a>
            <a className="Header_icons"><TwitterIcon  /></a>
            <a className="Header_icons"><YouTubeIcon  /></a>
            <a className="Header_icons"><LinkedInIcon /></a>
            <a className="Header_icons"><InstagramIcon/></a>
        </div>
    )
}

export default Header;
