import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"

function CategoryDropdown({ categories, selectedCategory, onCategoryChange }) {
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
          <em>None</em>
        </MenuItem>
        {categories.map((category, index) => (
          <MenuItem key={index} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryDropdown