import "./MainPage.css"
import { useState, useEffect } from 'react';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import { FetchAnnc } from "../../hooks/useAnnounceFetchMainPage";
import Button from '@mui/material/Button';

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



const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: "rgba(0,78,137,1)",
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


  const [yourLocation, setYourLocation] = React.useState([]);

  const [countries, setCountries] = React.useState([]);
  const [cities, setCities] = React.useState([]);
  const [languages, setLanguages] = React.useState([]);

  const fetchAnnc = FetchAnnc()
  const dispatch = useDispatch()
  const sort = useSelector((state) => state.mainpage.sort)


  const [languageTags, setLanguageTags] = useState([]);
  const filters = useSelector((state) => state.mainpage.filters)

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryInput, setCountryInput] = useState('');

  const [selectedCity, setSelectedCity] = useState(null);
  const [cityInput, setCityInput] = useState('');

  const [selectedDates, setSelectedDates] = useState("");
  const [selectedDatesFormat, setSelectedDatesFormat] = useState("");

  const [openCountry, setOpenCountry] = React.useState(false);
  const [openCity, setOpenCity] = React.useState(false);
  const loadingCountry = openCountry && countries.length === 0;
  const loadingCity = openCity && cities.length === 0;


  

  const loadCountries = async () => {
    await axios({
        method: "get",
        url: "https://api.nomadjourney.ir/api/v1/utils/get-countries/",
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((result) => {
        setCountries(result.data);
    }).catch((error) => {
        toast.error("Something went wrong while fetching countries.")
    })
  }

  const loadCities = async () => {
    if (selectedCountry) {
      axios({
          method: "get",
          url: `https://api.nomadjourney.ir/api/v1/utils/get-cities-of-country/${selectedCountry.id}`,
          headers: {
              'Content-Type': 'application/json',
          }
      }).then((result) => {
        setCities(result.data)
      }).catch((error) => {
          toast.error("Something went wrong while fetching cities.")
          console.log(error)
      })
    } 
  }
  const loadLanguages = async () => {

    axios({
        method: "get",
        url: "https://api.nomadjourney.ir/api/v1/accounts/GetLanguages",
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((result) => {
        setLanguages(result.data.data);
    }).catch((error) => {
        toast.error("Something went wrong while fetching Languages.")
    })
  }

  const FetchUserLoc = async (userName) => {
    try {
          
        await axios({
          method: "get",
          url: `https://api.nomadjourney.ir/api/v1/accounts/user/${userName}`,
        }).then(response => {
            
            setYourLocation([response.data.city_country, response.data.city_name])
        })
        
        
    } catch (error) {
    console.error(error);
    toast.error("Something went wrong while fetching Location.")
    }
  }

  React.useEffect(() => {
      let active = true;
      // if (!loadingCountry){
      //   return undefined
      // }
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
    let active = true;
    if(selectedCountry == null)
      setSelectedCity(null)
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
  }, [loadingCity, selectedCountry]);

  React.useEffect(() => {
    if (!openCity) {
        setCities([]);
    }
  }, [openCity]);


  React.useEffect(() => {
      loadLanguages()
  }, []);

  React.useEffect(() => {
    const signedInUser = JSON.parse(localStorage.getItem("tokens"))
    FetchUserLoc(signedInUser['username'])
  }, []);

 

  

  

      
  const fetchFilter = (selectedCity, selectedCountry, selectedDates, languageTags) => {
    let dictFilter = {}

    dictFilter["city"] = (selectedCity == null) ? "" : selectedCity.city_name
    dictFilter["country"] = (selectedCountry == null) ? "" : selectedCountry.country
    dictFilter["date"] = selectedDates
    dictFilter["language"] = languageTags
    dispatch(setLoader(true))
    dispatch(setPage(1));
    dispatch(setFilters(dictFilter))
    fetchAnnc(1, sort, dictFilter)

  }


  React.useEffect(() => {
    fetchFilter(selectedCity, selectedCountry, selectedDatesFormat, languageTags)
  }, [selectedCity, selectedCountry, selectedDatesFormat, languageTags]);
    

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

    const Language = () => {
      const [LaguageValue, setLaguageValue] = React.useState('');
      return(
        <div>
          <Autocomplete
            // value={value}
            onChange={(event, newValue) => {
              if(newValue.language_name.length > 0 && (!languageTags.includes(newValue.language_name))){
                setLanguageTags([...languageTags, newValue.language_name]);
                //fetchFilter(selectedCity, selectedCountry, selectedDates, [...languageTags, newValue.language_name])
              }
            }}
            inputValue={LaguageValue}
            onInputChange={(event, newInputValue) => {
              setLaguageValue(newInputValue);
            }}
            isOptionEqualToValue={(option, value) => option.language_name === value.language_name}
            getOptionLabel={(option) => option.language_name}
            getOptionSelected={(option, value) => {
                return option.language_name === value.language_name;
            }}
            id="controllable-languages-demo"
            options={languages ?? []}
            sx={{ width: 150,
                  marginLeft : 4
              }}
            renderInput={(params) => <TextField {...params} label="Language" />}
          />
        </div>
      )
    }


    const DateRangePickerButton = () => {
      

      const handleDateRangeChange = (newDateRange) => {
        
        const stdFormat = `${newDateRange[0].toLocaleDateString()} - ${newDateRange[1].toLocaleDateString()}`

        //fetchFilter(selectedCity, selectedCountry, stdFormat, languageTags)

        setSelectedDates(newDateRange);
        setSelectedDatesFormat(stdFormat)
        
      };
      return (
        <div>
          
            <Flatpickr
                // data-enable-time
                value={selectedDates}
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
        let updatedTags;
        updatedTags = languageTags
        updatedTags = updatedTags.filter((t) => t !== tag);
        setLanguageTags(updatedTags);
        fetchFilter(selectedCity, selectedCountry, selectedDates, updatedTags)
    };

    const handleYourLocation = () => {

      for(const count of countries){
        if (count.country == yourLocation[0]){
          setSelectedCountry(count)
          break
        }
      }
      setSelectedCity({"country" : yourLocation[0], "city_name" : yourLocation[1]})
      setSelectedDates("")
      setSelectedDatesFormat("")
      setLanguageTags([])
    }


    return(
        <div className="innerFilter">
            
          <div style={{display : "flex", justifyContent : "center"}}>

            <ThemeProvider theme={theme}>

                <Button sx={{ marginRight : 4}} variant="outlined" onClick={handleYourLocation}>Your Location</Button>

                <Sort/>

                <Language/>
                
                {/* Country */}
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
                        //fetchFilter(selectedCity, newValue, selectedDates, languageTags)
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
                
                {/* City */}
                <div>
          
                  <Autocomplete
                    
                    id="asynchronous-demo-city"
                    disabled = {countryInput == ''}
                    sx={{ 
                      width: 150,
                      marginLeft : 4,
                      textAlign : "center"
                    }}
                    open = {openCity}
                    onOpen={() => {
                      setOpenCity(true);
                    }}
                    onClose={() => {
                      setOpenCity(false);
                    }}
                    isOptionEqualToValue={(option, value) => option.city_name === value.city_name}
                    getOptionLabel={(option) => option.city_name}
                    getOptionSelected={(option, value) => {
                        return option.city_name === value.city_name;
                    }}
                    options={cities ?? []}
                    value={selectedCity}
                    onChange={(event, newValue) => {
                      setSelectedCity(newValue);
                    }}
                    inputValue={cityInput}
                    onInputChange={(event, newInputValue) => {
                      setCityInput(newInputValue);
                    }}
                    
                    renderInput={(params) => (
                      <TextField 
                          {...params} 
                          label= "City"
                          
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


                <DateRangePickerButton/>
            </ThemeProvider>

          </div>
            
            
            <div  style={{display : "flex", paddingTop : "20px", flexWrap : "wrap"}}>

                {(languageTags.length > 0) &&(
                  <div>
                    <p style={{marginTop : "10px",marginRight : 0}}><b>Languages : </b></p>
                  </div>
                )}
                <div>
                    {languageTags.length > 0 && (
                      <div style={{display : "flex", flexWrap : "wrap"}}>
                        {languageTags.map((tag) => (
                            <div style={{marginTop : "5px"}}>
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