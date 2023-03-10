import { useEffect } from 'react'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import store from './redux/store'
import Comment from './components/Comment'
import BaseInput from './components/BaseInput'

const state = store.getState()

function App() {
  //const user = useSelector((state) => state.user)
  const comments = useSelector((state) => state.commentReducer.comments)
  const dispatch = useDispatch()

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments))
  }, [comments])

  return (
    <div className='App'>
      {comments &&
        comments.map((comment) => {
          return <Comment {...comment} key={comment.id} comment={comment} />
        })}
      <BaseInput />
    </div>
  )
}

export default App
