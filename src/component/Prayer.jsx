import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Prayer({ name, time, image }) {
  return (
    <Card className="cardPrayer" sx={{ width: " 17%" }}>
      <CardMedia sx={{ height: 150 }} image={image} />
      <CardContent className="cardContent">
        <h2>{name}</h2>
        <Typography
          variant="h2"
          sx={{ color: "text.secondary", textAlign: "center" }}
        >
          {time}
        </Typography>
      </CardContent>
    </Card>
  );
}
