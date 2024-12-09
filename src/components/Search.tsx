import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from '@mui/material';
import { useState } from 'react';

interface SearchProps {
  setSearchQuery: (query: string) => void;
}

export default function Search({ setSearchQuery }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState('' as string);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchQuery(searchTerm);
  };

  return (
    <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
      <Box component="form" sx={{ display: 'flex' }} justifyContent='left' justifyItems='baseline' onSubmit={handleSubmit}>
        <OutlinedInput
          type="search"
          size="small"
          id="search"
          placeholder="Search…"
          sx={{ flexGrow: 1 }}
          startAdornment={
            <InputAdornment position="start" sx={{ color: 'text.primary' }}>
              <SearchRoundedIcon fontSize="small" />
            </InputAdornment>
          }
          inputProps={{
            'aria-label': 'search',
          }}
          onChange={(e) => {
            const target = e.target as HTMLTextAreaElement;
            setSearchTerm(target.value as string);
          }}
        />
        <IconButton type="submit" aria-label="search">
            <SearchIcon style={{ fill: "blue" }} />
        </IconButton>
      </Box>
    </FormControl>
  );
}
