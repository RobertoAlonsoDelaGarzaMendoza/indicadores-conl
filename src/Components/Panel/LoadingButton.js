import { CircularProgress } from "@material-ui/core";
import React from "react";
import './LoadingButton.css';

function LoadingButton({ className, loading, text, loading_text, onClick }) {
  return (
    <button className={className} disabled={loading} onClick={onClick}>
      {loading ? loading_text : text}
      <CircularProgress
        className={`button_loading_icon ${loading && "loading"}`}
        size=".9rem"
        color="inherit"
      />
    </button>
  );
}

export default LoadingButton;
