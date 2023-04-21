import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {

    city: 'none',
    country : 'none',
    username : 'none',
    firstname : 'none',
    lastname : 'none',
    email : 'none',

  },
  reducers: {

    setCountry: (state, action) => {
        state.country = action.payload
    },
    setCity: (state, action) => {
      state.city = action.payload
    },
    setUserName: (state, action) => {
      state.username = action.payload
    },
    setFirstName: (state, action) => {
      state.firstname = action.payload
    },
    setLastName: (state, action) => {
      state.lastname = action.payload
    },
    setMail: (state, action) => {
      state.email = action.payload
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { setCountry, setCity, setUserName, setFirstName, setLastName } = userSlice.actions

export default userSlice.reducer