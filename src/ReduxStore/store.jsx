import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./features/counter/counterSlice"
import userReducer from "./features/User/useSlice"


export default configureStore({
  reducer: {
    counter: counterReducer,
    user : userReducer,
  },
})