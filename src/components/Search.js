import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function Search({ searchString, handleSearchStringChange }) {
  return (
    <TextField
      margin="normal" 
      value={searchString}
      onChange={handleSearchStringChange}
      id="input-with-icon-textfield"
      placeholder="Search..."
      variant="outlined"
      size="small"
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  )
}
export default Search