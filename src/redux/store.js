import { configureStore } from '@reduxjs/toolkit'
import commentReducer from './commentSlice'
import userReducer from './userSlice'

const store = configureStore({
  reducer: {
    commentReducer,
    userReducer,
  },
})

export default store
