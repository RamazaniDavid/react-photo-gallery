import React from "react";

const ProgressBar = ({
  progress,
  backgroundColor = "rgb(205 133 74)",
  innerBackgroundColor = "rgb(37 28 25)",
  height = "2px",
  width = "100%",
}) => {
  return (
    <div
      style={{
        backgroundColor: `${backgroundColor}`,
        height: `${height}`,
        position: "fixed",
        top: "0",
        left: "50%",
        transform: "translate(-50%, 0)",
        width: `${width}`,
      }}
    >
      <div
        style={{
          backgroundColor: `${innerBackgroundColor}`,
          width: `${progress}%`,
          height: `${height}`,
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
