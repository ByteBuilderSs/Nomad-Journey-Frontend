import "./MainPage.css"
import { useState, useEffect } from 'react';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_orange.css";
import { FetchAnnc } from "../../hooks/useAnnounceFetchMainPage";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useDispatch,useSelector } from 'react-redux';
import { setAnncData, setLoader, setSort, setPagination, setPaginCount, setPage, setFilters } from "../../ReduxStore/features/MainPage/mainPageSlice"

import { toast } from "react-toastify";
import axios from 'axios';
import {CircularProgress} from "@mui/material"
import { setCity } from "../../ReduxStore/features/User/useSlice";

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


  const [countries, setCountries] = React.useState([]);
  const fetchAnnc = FetchAnnc()
  const dispatch = useDispatch()
  const sort = useSelector((state) => state.mainpage.sort)
  const [dateTags, setDateTags] = useState([]);
  const [cityTags, setCityTags] = useState([]);
  const [countryTags, setCountryTags] = useState([]);
  const [languageTags, setLanguageTags] = useState([]);
  const filters = useSelector((state) => state.mainpage.filters)

  const loadCountries = async () => {
    await axios({
        method: "get",
        url: "http://188.121.102.52:8000/api/v1/utils/get-countries/",
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((result) => {
        let cntrs = []
        for (const cnt of result.data) {
          cntrs.push(cnt.country)
        }
        setCountries(cntrs);
        console.log(cntrs);
    }).catch((error) => {
        toast.error("Something went wrong while fetching countries.")
    })
  }
      
  const fetchFilter = (cityTags, countryTags, dateTags, languageTags) => {
    let dictFilter = {}
    dictFilter["city"] = cityTags
    dictFilter["country"] = countryTags
    dictFilter["date"] = dateTags
    dictFilter["language"] = languageTags
    dispatch(setLoader(true))
    dispatch(setPage(1));
    dispatch(setFilters(dictFilter))
    fetchAnnc(1, sort, dictFilter)
  }

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
                if(newValue.length > 0 && (!languageTags.includes(newValue))){
                  setLanguageTags([...languageTags, newValue]);
                  fetchFilter(cityTags, countryTags, dateTags, [...languageTags, newValue])
                }
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
                if(newValue.length > 0 && (!cityTags.includes(newValue))){
                  setCityTags([...cityTags, newValue]);
                  fetchFilter([...cityTags, newValue], countryTags, dateTags, languageTags)
                }
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
                if(newValue.length > 0 && (!countryTags.includes(newValue))){
                  setCountryTags([...countryTags, newValue]);

                  fetchFilter(cityTags, [...countryTags, newValue], dateTags, languageTags)
                }
                  
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="asynchronous-demo-country"
              options={countries}
              // open={open}
              // onOpen={() => {
              //     setOpen(true);
              // }}
              // onClose={() => {
              //     setOpen(false);
              // }}
              sx={{ width: 150,
                    marginLeft : 4,
                }}
              renderInput={(params) => <TextField {...params} label="Country" />}
            />
      
          
          </div>
        );
    }

    const Sort = () => {
      

      const handleChange = (event) => {

        dispatch(setLoader(true))
        dispatch(setPage(1));
        dispatch(setSort(event.target.value));
        fetchAnnc(1,event.target.value, filters)
        
      };

      return(
        <Box sx={{ minWidth: 150 }}>
          <FormControl fullWidth>
            <InputLabel id="sort-label">Sort</InputLabel>
            <Select
              labelId="sort-label"
              id="sort"
              value={sort}
              label="Sort"
              onChange={handleChange}
            >
              <MenuItem value={"sort_by=anc_timestamp_created&descending=True"}>Newest</MenuItem>
              <MenuItem value={"sort_by=anc_timestamp_created"}>Oldest</MenuItem>
              <MenuItem value={"sort_by=travelers_count" }>Traveler's Count &#8595;</MenuItem>
              <MenuItem value={"sort_by=travelers_count&descending=True"}>Traveler's Count &#8593;</MenuItem>
              <MenuItem value={"sort_by=time_range" }>Time Range &#8595;</MenuItem>
              <MenuItem value={"sort_by=time_range&descending=True" }>Time Range &#8593;</MenuItem>

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
        if(stdFormat.length > 0 && (!dateTags.includes(stdFormat))){
          setDateTags([...dateTags, stdFormat]);
        }
        
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


    const handleTagDelete = (tag, type) => {
        let updatedTags;
        if (type == "country"){
          updatedTags = countryTags
          updatedTags = updatedTags.filter((t) => t !== tag);
          setCountryTags(updatedTags);
          fetchFilter(cityTags, updatedTags, dateTags, languageTags)
        }
        else if (type == "city"){
          updatedTags = cityTags
          updatedTags = updatedTags.filter((t) => t !== tag);
          setCityTags(updatedTags);
          fetchFilter(updatedTags, countryTags, dateTags, languageTags)
        }
        else if (type == "language"){
          updatedTags = languageTags
          updatedTags = updatedTags.filter((t) => t !== tag);
          setLanguageTags(updatedTags);
          fetchFilter(cityTags, countryTags, dateTags, updatedTags)
        }
        else if (type == "date"){
          updatedTags = dateTags
          updatedTags = updatedTags.filter((t) => t !== tag);
          setDateTags(updatedTags);
        }

        
        
        
    };

    useEffect(() => {
      loadCountries()
    }, []);

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
                    {dateTags.length > 0 && (
                        <div style={{display : "flex"}}>
                        {dateTags.map((tag) => (
                            <div>
                              <div className="filterTag" onClick={() => handleTagDelete(tag,"date")}>
                                  {tag}
                                  <div className="deletebutton" >X</div>
                              </div>
                            </div>
                        ))}
                        </div>
                    )}
                </div>
                <div>
                    {languageTags.length > 0 && (
                        <div style={{display : "flex"}}>
                        {languageTags.map((tag) => (
                            <div>
                              <div className="filterTag" onClick={() => handleTagDelete(tag, "language")}>
                                  {tag}
                                  <div className="deletebutton" >X</div>
                              </div>
                            </div>
                        ))}
                        </div>
                    )}
                </div>
                <div>
                    {countryTags.length > 0 && (
                        <div style={{display : "flex"}}>
                        {countryTags.map((tag) => (
                            <div>
                              <div className="filterTag" onClick={() => handleTagDelete(tag, "country")}>
                                  {tag}
                                  <div className="deletebutton" >X</div>
                              </div>
                            </div>
                        ))}
                        </div>
                    )}
                </div>
                <div>
                    {cityTags.length > 0 && (
                        <div style={{display : "flex"}}>
                        {cityTags.map((tag) => (
                            <div>
                              <div className="filterTag" onClick={() => handleTagDelete(tag, "city")}>
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