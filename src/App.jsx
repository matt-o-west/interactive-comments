import { useState } from 'react'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import store from './redux/store'
import Comment from './components/Comment'

const state = store.getState()

function App() {
  //const user = useSelector((state) => state.user)
  const comments = useSelector((state) => state.commentReducer.comments)
  console.log(comments)

  return (
    <div className='App'>
      {comments &&
        comments.map((comment) => {
          return <Comment {...comment} key={comment.id} comment={comment} />
        })}
    </div>
  )
}

export default App
