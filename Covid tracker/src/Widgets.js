import React from "react";
import "./Widgets.css";

function Widgets() {
  return (
    <div className="widgets">
      <iframe
        className="iframe"
        src="https://www.covid19india.org/resources"
        width="100%"
        height="400px"
        margin="10px"
        style={{
          border: "none",
          overflow: "hidden",
        }}
        scrolling="yes"
        farmeborder="0"
        allowTransparency="true"
        allow="encrypted-media"
      ></iframe>
    </div>
  );
}

export default Widgets;
