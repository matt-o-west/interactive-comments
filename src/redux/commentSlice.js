import { createSlice } from '@reduxjs/toolkit'

const commentSlice = () =>
  createSlice({
    name: 'comments',
    initialState: [],
    reducers: {
      addComment: (state, action) => {
        state.push(action.payload)
      },
      removeComment: (state, action) => {
        return state.filter((comment) => comment.id !== action.payload)
      },
      editComment: (state, action) => {
        const { id, newComment } = action.payload
        const existingComment = state.find((comment) => comment.id === id)
        if (existingComment) {
          existingComment.comment = newComment
        }
      },
    },
  })

const { actions, reducer } = commentSlice

export const { addComment, removeComment, editComment } = actions

export default reducer
