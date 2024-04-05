import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"

function CategoryDropdown({ categories, selectedCategory, onCategoryChange }) {

  function formatAndCapitalize(text) {
    const withSpaces = text.replace(/-/g, ' ');
    return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1).toLowerCase();
  }
  

  return (
    <FormControl variant="outlined" fullWidth margin="normal" size="small">
      <InputLabel id="category-select-label">Category</InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        value={selectedCategory}
        onChange={onCategoryChange}
        label="Category"
      >
        <MenuItem value="">
          All Products
        </MenuItem>
        {categories.map((category, index) => (
          <MenuItem key={index} value={category}>
            {formatAndCapitalize(category)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryDropdown