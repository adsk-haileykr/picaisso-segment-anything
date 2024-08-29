import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AppContext from "./hooks/createContext";

export default function ImageCard({
  idx,
  imgSrc,
  imgName
}: {
  idx: number;
  imgSrc: string;
  imgName: string;
}) {
  const {
    imageSelection: [, setImageSelection],
  } = useContext(AppContext)!;
  return (
    <Card
      className="image-card"
      sx={{ width: "110px", m: "10px", cursor: 'pointer' }}
      onClick={() => setImageSelection(idx)}
    >
      <CardMedia
        component="img"
        sx={{ height: "110px", objectFit: "contain" }}
        image={imgSrc}
        alt="acc photo"
      />
      <CardContent sx={{ height: "45px" }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {imgName}
        </Typography>
      </CardContent>
    </Card>
  );
}
