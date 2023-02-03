import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const now = new Date()

const initialState = [
  {
    comments: [
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
  },
]

const slice = {
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state = '', action) => {
      const { user, comment } = action.payload
      const { comments } = state

      const newComment = {
        id: uuidv4(),
        content: comment,
        createdAt: now.getTime(),
        score: 0,
        user: {
          image: {
            png: `./images/avatars/image-${user}.png`,
            webp: `./images/avatars/image-${user}.webp`,
          },
          username: user.username,
        },
      }
      localStorage.setItem('comments', JSON.stringify(...comments, newComment))
      return {
        comments: [...comments, newComment],
      }
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
}

const { actions, reducer } = createSlice(slice)

export const { addComment, removeComment, editComment } = actions

export default reducer
