import { createSlice } from '@reduxjs/toolkit'
import { useTransition } from 'react'
import { v4 as uuidv4 } from 'uuid'

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
  comments: JSON.parse(localStorage.getItem('comments')) || [
    {
      id: 1,
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      createdAt: '1 month ago',
      score: 12,
      user: {
        image: {
          png: './images/avatars/image-amyrobson.png',
          webp: './images/avatars/image-amyrobson.webp',
        },
        username: 'amyrobson',
      },
      replies: [],
    },
    {
      id: 2,
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      createdAt: '2 weeks ago',
      score: 5,
      user: {
        image: {
          png: './images/avatars/image-maxblagun.png',
          webp: './images/avatars/image-maxblagun.webp',
        },
        username: 'maxblagun',
      },
      replies: [
        {
          id: 3,
          content:
            "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          createdAt: '1 week ago',
          score: 4,
          replyingTo: 'maxblagun',
          user: {
            image: {
              png: './images/avatars/image-ramsesmiron.png',
              webp: './images/avatars/image-ramsesmiron.webp',
            },
            username: 'ramsesmiron',
          },
        },
        {
          id: 4,
          content:
            "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          createdAt: '2 days ago',
          score: 2,
          replyingTo: 'ramsesmiron',
          user: {
            image: {
              png: './images/avatars/image-juliusomo.png',
              webp: './images/avatars/image-juliusomo.webp',
            },
            username: 'juliusomo',
          },
        },
      ],
    },
  ],
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
        id: uuidv4(),
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
      return {
        comments: [...comments, newComment],
      }
    },
    removeComment: (state, action) => {
      const { comments } = state
      //console.log('delete comment', action.payload) // action payload is id
      const commentToDelete = findCommentById(action.payload, comments)
      //console.log(JSON.stringify(commentToDelete))

      if (commentToDelete.replyingTo) {
        const parentComment = comments.find(
          (comment) => comment.user.username === commentToDelete.replyingTo
        )
        parentComment.replies = parentComment.replies.filter(
          (reply) => reply.id !== commentToDelete.id
        )
      } else {
        return {
          comments: comments.filter(
            (comment) => comment.id !== commentToDelete.id
          ),
        }
      }
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

      const newReply = {
        id: uuidv4(),
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
      }

      const { comments } = state
      const commentToReplyTo = findCommentById(id, comments)
      if (commentToReplyTo) {
        commentToReplyTo.replies.push(newReply)
      }
    },
    removeReply: (state, action) => {
      const { comments } = state
      //console.log('delete comment', action.payload) // action payload is id
      const commentToDelete = findCommentById(action.payload, comments)
      //console.log(JSON.stringify(commentToDelete))

      if (commentToDelete.replyingTo) {
        const parentComment = comments.find(
          (comment) => comment.user.username === commentToDelete.replyingTo
        )
        parentComment.replies = parentComment.replies.filter(
          (reply) => reply.id !== commentToDelete.id
        )
      } else {
        return {
          comments: comments.filter(
            (comment) => comment.id !== commentToDelete.id
          ),
        }
      }
    },
    incrementScore: (state, action) => {
      const { comments } = state
      const commentToIncrement = findCommentById(action.payload, comments)
      if (commentToIncrement) {
        console.log(state.comments)
        commentToIncrement.score++
        commentToIncrement.hasVoted = true // add hasVoted property, disables button in component
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
      return initialState
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
} = actions

export default reducer
