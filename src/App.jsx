import { useState } from 'react'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import store from './redux/commentStore'
import Comment from './components/Comment'

const state = store.getState()

function App() {
  //const user = useSelector((state) => state.user)
  const comments = useSelector((state) => state.commentReducer[0].comments)
  console.log(comments)

  return (
    <div className='App'>
      {comments &&
        comments.map((comment) => {
          return <Comment {...comment} key={comment.id} />
        })}
    </div>
  )
}

export default App
