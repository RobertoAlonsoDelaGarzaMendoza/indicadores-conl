import React from "react";
import "./Skeleton.css";

function Skeleton({ height = "20px", marginTop = "0", marginBottom = "0" }) {
  const configstyle = {
    height,
    marginTop,
    marginBottom,
  };
  return <div className="skeleton" style={configstyle}></div>;
}

export default Skeleton;
