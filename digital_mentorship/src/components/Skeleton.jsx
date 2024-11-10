
import React from "react";
import "../styles/skeleton/skeleton.css";

const Skeleton = ({ width, height, borderRadius }) => {
  return (
    <div
      className="skeleton"
      style={{ width: width, height: height, borderRadius: borderRadius }}
    ></div>
  );
};

export default Skeleton;
