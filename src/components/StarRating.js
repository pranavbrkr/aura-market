import { Box, Rating } from "@mui/material"

function StarRating({ rating }) {
  return (
    <Box component="fieldset" mb={3} borderColor="transparent" style={{ padding: 0, margin: 0}}>
      <Rating name="read-only" value={rating} readOnly />
    </Box>
  )
}
export default StarRating