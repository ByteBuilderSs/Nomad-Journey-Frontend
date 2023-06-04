import { Container, InputAdornment, TextField,IconButton } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

import {useSearchBlog} from '../../hooks/useSearchBlog'

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

  const {searchBlogs,blogs}=useSearchBlog()
  const handelClick=async(event)=>
  {
    event.preventDefault();

    await searchBlogs(searchTerm);
    console.log(blogs)
  }
  return (
    <Container  sx={{ mt: 20 ,
                    top:0,
                    right:0,
                    justifyContent:'center',
                    marginTop:'0.3rem',
                    position:'absolute',
                    display:'flex',
                    margin:'0.3rem',
                    width:'100%',
                    }}>
      <TextField
    
        id="search"
        type="search"
        label="Search"
        value={searchTerm}
        onChange={handleChange}
        sx={{ width:'70%' ,justifyContent:'center',borderColor:'#1A659E'}}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton disabled={active} onClick={handelClick}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );
}