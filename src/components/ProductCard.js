import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import StarRating from "./StarRating";

function ProductCard({ product }) {

  const navigate = useNavigate();
  const [elevation, setElevation] = useState(1)

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  }

  return (
    <Card onClick={handleClick} onMouseEnter={() => setElevation(8)} onMouseLeave={() => setElevation(1)} elevation={elevation} style={{ maxWidth: 345, margin: 'auto', marginBottom: 20 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="product.title"
          height="140"
          image={product.thumbnail}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${product.price}
          </Typography>
          <StarRating rating={product.rating} />
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
export default ProductCard