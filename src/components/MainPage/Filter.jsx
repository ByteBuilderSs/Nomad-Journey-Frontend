import "./MainPage.css"
import { useState } from 'react';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_orange.css";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const options = ['Option 1', 'Option 2'];

const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: "#E55405",
      },
      secondary: {
        main: '#fff',
      },
    },
});

export default function Filters() {

    const [selectedTags, setSelectedTags] = useState([]);
    const [sort, setSort] = React.useState('');

    const Language = () => {
    
        const [value, setValue] = React.useState('');
        const [inputValue, setInputValue] = React.useState('');
        
        return (
          <div>
            {/* <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
            <div>{`inputValue: '${inputValue}'`}</div> */}
            <Autocomplete
              // value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
                if(newValue.length > 0 && (!selectedTags.includes(newValue)))
                  setSelectedTags([...selectedTags, newValue]);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="controllable-states-demo"
              options={options}
              sx={{ width: 150,
                    marginLeft : 4
                }}
              renderInput={(params) => <TextField {...params} label="Language" />}
            />
      
          
          </div>
        );
    }

    const City = () => {
    
        const [value, setValue] = React.useState('');
        const [inputValue, setInputValue] = React.useState('');
        
        return (
          <div>
            {/* <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
            <div>{`inputValue: '${inputValue}'`}</div> */}
            <Autocomplete
              // value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
                if(newValue.length > 0 && (!selectedTags.includes(newValue)))
                  setSelectedTags([...selectedTags, newValue]);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="controllable-states-demo"
              options={options}
              sx={{ width: 150,
                    marginLeft : 4,
                }}
              renderInput={(params) => <TextField {...params} label="City" />}
            />
      
          
          </div>
        );
    }

    const TimeRange = () => {
    
        const [value, setValue] = React.useState('');
        
        return (
            <div></div>
        );
    }

    const State = () => {
    
        const [value, setValue] = React.useState('');
        const [inputValue, setInputValue] = React.useState('');
        
        return (
          <div>
            {/* <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
            <div>{`inputValue: '${inputValue}'`}</div> */}
            <Autocomplete
              // value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
                if(newValue.length > 0 && (!selectedTags.includes(newValue)))
                  setSelectedTags([...selectedTags, newValue]);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="controllable-states-demo"
              options={options}
              sx={{ width: 150,
                    marginLeft : 4,
                }}
              renderInput={(params) => <TextField {...params} label="State" />}
            />
      
          
          </div>
        );
    }

    const Sort = () => {

      const handleChange = (event) => {
        setSort(event.target.value);
      };

      return(
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="sort-label">Sort</InputLabel>
          <Select
            labelId="sort-label"
            id="sort"
            value={sort}
            label="Sort"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
    )
    }


    const DateRangePickerButton = () => {
      const [dateRange, setDateRange] = useState([null, null]);
      const [showCalendar, setShowCalendar] = useState(false);

      const handleDateRangeChange = (newDateRange) => {
        setDateRange(newDateRange);
        console.log(`${newDateRange[0].toLocaleDateString()} - ${newDateRange[1].toLocaleDateString()}`);
        const stdFormat = `${newDateRange[0].toLocaleDateString()} - ${newDateRange[1].toLocaleDateString()}`
        if(stdFormat.length > 0 && (!selectedTags.includes(stdFormat)))
          setSelectedTags([...selectedTags, stdFormat]);
        
      };
      return (
        <div>
          
            <Flatpickr
                data-enable-time
                value={dateRange}
                onClose = {handleDateRangeChange}
                options = {{
                    mode: "range",
                    enableTime : false,
                    dateFormat: "Y/m/d",
                    
                }}
                className = "my-date-picker"
                placeholder = "Date Range" 
                
            />

        </div>
      );
    }


    const handleTagDelete = (tag) => {
        const updatedTags = selectedTags.filter((t) => t !== tag);
        setSelectedTags(updatedTags);
    };

    return(
        <div className="innerFilter">
            
            <div style={{display : "flex", justifyContent : "center"}}>

            <ThemeProvider theme={theme}>
                <Sort/>
                <Language/>
                <City/>
                <State/>
                <DateRangePickerButton/>
            </ThemeProvider>

            </div>
            
            <div style={{display : "flex", paddingTop : "20px"}}>
                <div>
                    <p style={{marginTop : "5px",marginRight : 0, marginBottom : "15px"}}><b>Filters : </b></p>
                </div>
                <div>
                    {selectedTags.length > 0 && (
                        <div style={{display : "flex"}}>
                        {selectedTags.map((tag) => (
                            // <span style={{borderRadius : "1px"}} key={tag} className="bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2">
                            // {tag}
                            // <button className="ml-2" onClick={() => handleTagDelete(tag)}>
                            //     X
                            // </button>
                            // </span>
                            <div>
                              <div className="filterTag" onClick={() => handleTagDelete(tag)}>
                                  {tag}
                                  <div className="deletebutton" >X</div>
                              </div>
                            </div>
                        ))}
                        </div>
                    )}
                </div>
                
            </div>

        </div>
    )
}