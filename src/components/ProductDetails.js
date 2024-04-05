import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StarRating from './StarRating'; // Assuming you have this component
import { Box, Button, Container, Grid, IconButton, Typography } from "@mui/material";
import { AddCircleOutline, DeleteOutline, RemoveCircleOutline } from "@mui/icons-material";

function ProductDetails({ cartItems, addToCart, handleCartItemIncreaseQuantity, handleCartItemDecreaseQuantity, handleCartItemRemove }) {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [productQuantity, setProductQuantity] = useState(0);

  useEffect(() => {
    console.log("UseEffect fired")
    axios.get(`https://dummyjson.com/products/${productId}`)
      .then(response => {
        setProduct(response.data);
        setSelectedImage(response.data.images[0]); // Set the first image as the selected one initially
        const cartItem = cartItems.find(item => item.id === response.data.id);
        if (cartItem) {
          setProductQuantity(cartItem.quantity);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [cartItems, productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    setProductQuantity(1);
  }

  return (
    <Container style={{ marginTop: '20px', marginBottom: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
          <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', height: 'auto' }} />
          <div style={{ overflowX: 'auto', display: 'flex', marginTop: '10px' }}>
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                style={{ width: '100px', height: 'auto', marginRight: '10px', cursor: 'pointer' }}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4">{product.title}</Typography>
          <Typography variant="subtitle1" style={{ margin: '20px 0' }}>{product.category}</Typography>
          <Typography display="inline" variant="body1">
            Original price: 
          </Typography>
          <Typography display="inline" variant="body1" style={{ textDecoration: product.discountPercentage ? 'line-through' : 'none' }}>
            ${product.price}
          </Typography>
          {product.discountPercentage && (
            <Typography variant="body1" style={{ color: 'green', marginBottom: '20px' }}>
              Discounted price: ${product.price - (product.price * product.discountPercentage / 100).toFixed(2)}
            </Typography>
          )}
          <Box my={2}>
            <StarRating rating={product.rating} />
          </Box>

          <Box my={2}>
            {productQuantity === 0 ? (
              <Button
              onClick={handleAddToCart} 
              variant="contained"
              sx={{
                bgcolor: 'warning.main', // Using the warning color for a yellow button
                '&:hover': { bgcolor: 'warning.dark' },
                borderRadius: '20px', // Capsule shape
                color: 'white',
                padding: '10px 40px',
                textTransform: 'none',
                width: '100%', // Full width within its container
              }}
            >
              Add to Cart
            </Button>
            ) : (
              <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                <Typography variant="h6" sx={{ mb: 2 }}>Quantity in Cart: {productQuantity}</Typography>
                <Box display="flex">
                  <IconButton onClick={() => {handleCartItemDecreaseQuantity(productId)}}><RemoveCircleOutline /></IconButton>
                  <IconButton onClick={() => handleCartItemRemove(productId)}><DeleteOutline /></IconButton>
                  <IconButton onClick={() => handleCartItemIncreaseQuantity(productId)}><AddCircleOutline /></IconButton>
                </Box>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductDetails;