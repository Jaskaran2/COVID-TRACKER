import React from "react";
import "./InfoBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ active, title, cases, casesType, total, ...props }) {
  const customStyle = {
    borderTopColor: "",
  };

  if (casesType === "cases" && active) {
    customStyle.borderTop = "10px solid orange";
  } else if (casesType === "deaths" && active) {
    customStyle.borderTop = "10px solid red";
  } else if (casesType === "recovered" && active) {
    customStyle.borderTop = "10px solid greenyellow";
  }

  console.log("type of cases is    ", casesType);
  return (
    <div className="infoBox">
      <Card style={customStyle} onClick={props.onClick}>
        <CardContent>
          <Typography className="infoBox__title" color="textSecondary">
            {title}
          </Typography>
          <h2 className="infoBox__cases"> {cases} </h2>
          <Typography className="infoBox__total" color="textSecondary">
            {total}
            Total
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default InfoBox;
