import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {
    username: '',
    image: {
      png: '',
      webp: '',
    },
  },
}

const slice = {
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const { username } = action.payload
      return {
        username,
      }
    },
    logout: (state, action) => {
      return {
        username: '',
      }
    },
  },
}

const userSlice = createSlice(slice)
const { actions, reducer } = userSlice

export const { login, logout } = actions
export default reducer
