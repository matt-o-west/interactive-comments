import { configureStore } from '@reduxjs/toolkit'
import commentReducer from './commentSlice'

const store = configureStore({
  reducer: {
    commentReducer,
  },
})

export default store
