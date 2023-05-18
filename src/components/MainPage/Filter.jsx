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

const cities_static = [
  // Iran
  "Tehran",
  "Mashhad",
  "Isfahan",
  "Tabriz",
  "Shiraz",
  // USA
  "New York City",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Miami",
  // Canada
  "Toronto",
  "Montreal",
  "Vancouver",
  "Calgary",
  "Ottawa",
  // Afghanistan
  "Kabul",
  "Herat",
  "Mazar-i-Sharif",
  "Kandahar",
  "Jalalabad",
  // Japan
  "Tokyo",
  "Osaka",
  "Kyoto",
  "Yokohama",
  "Nagoya",
  // Turkey
  "Istanbul",
  "Ankara",
  "Izmir",
  "Bursa",
  "Antalya",
  // Europe
  "Paris",
  "London",
  "Rome",
  "Berlin",
  "Madrid"
  // Add more cities as needed
];

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

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export default function Filters() {


  const [countries, setCountries] = React.useState([]);
  const [cities, setCities] = React.useState([]);
  const [languages, setLanguages] = React.useState([]);
  const fetchAnnc = FetchAnnc()
  const dispatch = useDispatch()
  const sort = useSelector((state) => state.mainpage.sort)
  const [dateTags, setDateTags] = useState([]);
  const [cityTags, setCityTags] = useState([]);
  const [countryTags, setCountryTags] = useState([]);
  const [languageTags, setLanguageTags] = useState([]);
  const filters = useSelector((state) => state.mainpage.filters)

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryInput, setCountryInput] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityInput, setCityInput] = useState('');


  const [openCountry, setOpenCountry] = React.useState(false);
  const [openCity, setOpenCity] = React.useState(false);
  const loadingCountry = openCountry && countries.length === 0;
  const loadingCity = openCity && cities.length === 0;

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
          cntrs.push(cnt)
        }
        setCountries(cntrs);
    }).catch((error) => {
        toast.error("Something went wrong while fetching countries.")
    })
  }

  const loadCities = async () => {
    if (selectedCountry) {
      axios({
          method: "get",
          url: "http://188.121.102.52:8000/api/v1/utils/get-all-cities/",
          headers: {
              'Content-Type': 'application/json',
          }
      }).then((result) => {
        let cits = []
        for (const cit of result.data) {
          cits.push(cit.city_name)
        }
        setCities(cits)
      }).catch((error) => {
          toast.error("Something went wrong while fetching cities.")
          console.log(error)
      })
    } 
  }
  const loadLanguages = async () => {

    axios({
        method: "get",
        url: "http://188.121.102.52:8000/api/v1/accounts/GetLanguages",
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((result) => {
        let lang = []
        for (const lan of result.data.data) {
          lang.push(lan.language_name)
        }
        setLanguages(lang);
    }).catch((error) => {
      console.log("errorrr :")
      console.log(error)
        toast.error("Something went wrong while fetching Languages.")
    })
  }


  React.useEffect(() => {
      let active = true;
      if (!loadCountries){
        return undefined
      }
      (async () => {
          await sleep(1e3); // For demo purposes.
          if (active) 
          {
            loadCountries();
          }
      })();
      return () => {
          active = false;
      };
  }, [loadingCountry]);

  React.useEffect(() => {
    if (!openCountry) {
        setCountries([]);
    }
  }, [openCountry]);

  React.useEffect(() => {
    let active = true;
    if (!loadingCity) {
        return undefined;
    }
    (async () => {
        await sleep(1e3); // For demo purposes.
        if (active) 
        {
            loadCities();
        }
    })();
    return () => {
        active = false;
    };
  }, [loadingCity]);

  React.useEffect(() => {
      if (!openCity) {
          setCities([]);
      }
  }, [openCity]);

      
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
              id="controllable-languages-demo"
              options={languages}
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
          
          <Autocomplete
            
            id="asynchronous-demo-city"
            sx={{ 
              width: 150,
              marginLeft : 4,
            }}
            onOpen={() => {
              setOpenCity(true);
            }}
            onClose={() => {
              setOpenCity(false);
            }}
            options={cities}
            value={selectedCity}
            onChange={(event, newValue) => {
              setSelectedCity(newValue);
              if(newValue.length > 0 && (!cityTags.includes(newValue))){
                setCityTags([...cityTags, newValue]);
                fetchFilter([...cityTags, newValue],countryTags , dateTags, languageTags)
              }
                
            }}
            inputValue={cityInput}
            onInputChange={(event, newInputValue) => {
              setCityInput(newInputValue);
            }}
            
            renderInput={(params) => (
              <TextField 
                  {...params} 
                  label="City"
                  placeholder="Select your country)"
                  InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                      <React.Fragment>
                          {loadingCity ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                      </React.Fragment>
                      ),
                  }} 
              />
            )}

          />
    
        
        </div>
      );
    }


    const State = () => {
    
        return (
          <div>
            
            <FormControl fullWidth variant="outlined">
            <Autocomplete
              
              id="asynchronous-demo-country"

              sx={{ 
                width: 150,
                marginLeft : 4,
              }}
              open={openCountry}


              onOpen={() => {
                setOpenCountry(true);
              }}
              onClose={() => {
                  setOpenCountry(false);
              }}
              options={countries ?? []}
              value={selectedCountry}
              onChange={(event, newValue) => {
                setSelectedCountry(newValue);
              }}

              inputValue={countryInput}
              onInputChange={(event, newInputValue) => {
                setCountryInput(newInputValue);
              }}

              isOptionEqualToValue={(option, value) => {
                if (option && value) {
                    return option.country === value.country;
                } else {
                    return false;
                }
              }}
              getOptionLabel={(option) => {
                  return (option ? option.country : "");
              }}
              getOptionSelected={(option, value) => {
                  return option.country === value.country;
              }}
              
              
                            
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  label="Country"
                  placeholder="Country"
                  InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                      <React.Fragment>
                          {loadingCountry ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                      </React.Fragment>
                      ),
                  }}
                />
              )}
            />
            </FormControl>
          
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
        const stdFormat = `${newDateRange[0].toLocaleDateString()} - ${newDateRange[1].toLocaleDateString()}`
        if(stdFormat.length > 0 && (dateTags.length != 1)){
          setDateTags([...dateTags, stdFormat]);
          fetchFilter(cityTags, countryTags, [...dateTags, stdFormat], languageTags)
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
          fetchFilter(cityTags, countryTags, updatedTags, languageTags)
        }

        
        
        
    };


    return(
        <div className="innerFilter">
            
          <div style={{display : "flex", justifyContent : "center"}}>

            <ThemeProvider theme={theme}>
                <Sort/>
                <Language/>
                <State/>
                <City/>
                <DateRangePickerButton/>
            </ThemeProvider>

          </div>
            {(dateTags.length + languageTags.length + cityTags.length + countryTags.length > 0) &&(
              <div>
                <p style={{marginTop : "5px",marginRight : 0}}><b>Filters : </b></p>
              </div>
            )}
            
            <div  style={{display : "flex", paddingTop : "5px", flexWrap : "wrap"}}>
                
                
                  <div>
                      {dateTags.length > 0 && (
                          <div style={{display : "flex", flexWrap : "wrap"}}>
                          {dateTags.map((tag) => (
                              <div style={{marginTop : "5px"}}>
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
                          <div style={{display : "flex", flexWrap : "wrap"}}>
                          {languageTags.map((tag) => (
                              <div style={{marginTop : "5px"}}>
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
                          <div style={{display : "flex", flexWrap : "wrap"}}>
                          {countryTags.map((tag) => (
                              <div style={{marginTop : "5px"}}>
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
                          <div style={{display : "flex", flexWrap : "wrap"}}>
                          {cityTags.map((tag) => (
                              <div style={{marginTop : "5px"}}>
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