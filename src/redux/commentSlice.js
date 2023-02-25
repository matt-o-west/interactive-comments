import { createSlice } from '@reduxjs/toolkit'
import { useTransition } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { initialComments } from '../utils/initialComments'

const now = new Date()
const date = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 7)
const localeTime = date.toLocaleTimeString('en-US', {
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
})

function findCommentById(id, comments) {
  for (const comment of comments) {
    if (comment.id === id) {
      return comment
    }
    if (comment.replies) {
      const foundInReplies = findCommentById(id, comment.replies)
      if (foundInReplies) {
        return foundInReplies
      }
    }
  }
  return null
}

const initialState = {
  comments: JSON.parse(localStorage.getItem('comments')) || initialComments,
}

const slice = {
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state = '', action) => {
      console.log('payload', action.payload)
      const { user, input } = action.payload
      const { comments } = state

      const newComment = {
        id: state.comments.length + 1,
        content: input,
        createdAt: localeTime,
        score: 0,
        user: {
          image: {
            png: `src/images/avatars/image-${user}.png`,
            webp: `src/images/avatars/image-${user}.webp`,
          },
          username: user,
        },
      }
      comments.push(newComment)
    },
    removeComment: (state, action) => {
      const { comments } = state
      const { id, isReply } = action.payload
      //const commentToDelete = findCommentById(id, comments)

      comments.forEach((comment) => {
        if (comment.id === id) {
          if (isReply) {
            // Find the reply with the matching ID and remove it
            comment.replies = comment.replies.filter((reply) => reply.id !== id)
          } else {
            // Remove the comment and all its replies
            comments = comments.filter((c) => c.id !== id)
          }
        } else {
          // If the comment isn't the one to remove, check its replies
          comment.replies = comment.replies.filter((reply) => {
            if (reply.id === id) {
              return false // Remove the reply
            }
            return true // Keep the reply
          })
        }
      })
    },
    editComment: (state, action) => {
      const { id, edit } = action.payload
      const { comments } = state
      const commentToUpdate = findCommentById(id, comments)

      if (commentToUpdate) {
        commentToUpdate.content = edit
      }
    },
    addReply: (state, action) => {
      console.log('payload', action.payload)
      const { id, reply, user } = action.payload
      const { comments } = state
      const commentToReplyTo = findCommentById(id, comments)

      const newReply = {
        id: commentToReplyTo.id + ' reply ' + uuidv4().toString(),
        content: reply,
        createdAt: localeTime,
        score: 0,
        user: {
          image: {
            png: `src/images/avatars/image-${user}.png`,
            webp: `src/images/avatars/image-${user}.webp`,
          },
          username: user,
        },
        replyingTo: commentToReplyTo.user.username,
      }

      if (commentToReplyTo) {
        commentToReplyTo.replies.push(newReply)
      }
    },
    removeReply: (state, action) => {
      const { id, replyId } = action.payload
      const { comments } = state
      const commentToReplyTo = findCommentById(id, comments)
      if (commentToReplyTo) {
        commentToReplyTo.replies = commentToReplyTo.replies.filter(
          (reply) => reply.id !== replyId
        )
      }
    },
    incrementScore: (state, action) => {
      const { comments } = state
      const commentToIncrement = findCommentById(action.payload, comments)
      if (commentToIncrement && !commentToIncrement.hasVoted) {
        const isReply = /^reply-\d+$/.test(action.payload)
        if (isReply) {
          console.log(state.comments)
          commentToIncrement.score++
          commentToIncrement.hasVoted = true // add hasVoted property, disables button in component
        } else if (!isReply) {
          console.log(state.comments)
          commentToIncrement.score++
          commentToIncrement.hasVoted = true // add hasVoted property, disables button in component
        }
      }
    },
    decrementScore: (state, action) => {
      const { comments } = state
      const commentToDecrement = findCommentById(action.payload, comments)
      if (commentToDecrement) {
        console.log(state.comments)
        commentToDecrement.score--
        commentToDecrement.hasVoted = true // add hasVoted property, disables button in component
      }
    },
    resetState: () => {
      return {
        comments: initialComments,
      }
    },
  },
}

const { actions, reducer } = createSlice(slice)

export const {
  addComment,
  removeComment,
  editComment,
  addReply,
  removeReply,
  incrementScore,
  decrementScore,
  resetState,
} = actions

export default reducer
