import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./features/counter/counterSlice"
import userReducer from "./features/User/useSlice"
import mainPageReducer from "./features/MainPage/mainPageSlice"

export default configureStore({
  reducer: {
    counter: counterReducer,
    user : userReducer,
    mainpage : mainPageReducer
  },
})