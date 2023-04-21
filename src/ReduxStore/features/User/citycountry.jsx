import { createSlice } from '@reduxjs/toolkit'

export const citycountrySlice = createSlice({
  name: 'citycountry',
  initialState: {
    city: '',
    country : '',
  },
  reducers: {

    setCountry: (state, action) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.country = action.payload
      },

    setCity: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.city = action.payload
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { setCountry, setCity } = citycountrySlice.actions

export default citycountrySlice.reducer