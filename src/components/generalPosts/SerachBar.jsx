import { Container, InputAdornment, TextField,IconButton } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [active,setActive]=useState(true)

  const handleChange = (event) => {
    
    setSearchTerm(event.target.value)
    if(searchTerm.length>=3)
    {
      setActive(false)
    }else{
      setActive(true)
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 20 ,top:0,right:0,justifyContent:'right',marginTop:'0.3rem',position:'absolute',display:'flex'}}>
      <TextField
    
        id="search"
        type="search"
        label="Search"
        value={searchTerm}
        onChange={handleChange}
        sx={{ width:'40%' ,justifyContent:'right'}}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton disabled={active}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );
}