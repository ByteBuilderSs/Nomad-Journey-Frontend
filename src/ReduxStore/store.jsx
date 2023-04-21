import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./features/counter/counterSlice"
import citycountryReducer from "./features/User/citycountry"

export default configureStore({
  reducer: {
    counter: counterReducer,
    citycountry : citycountryReducer
  },
})