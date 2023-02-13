import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {
    username: 'ramsesmiron',
    image: {
      png: './images/avatars/image-ramsesmiron.png',
      webp: './images/avatars/image-ramsesmiron.webp',
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

export const avatar = (state) => state.user.image.png
export const { login, logout } = actions
export default reducer
