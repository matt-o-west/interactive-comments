import React, { useState } from 'react'
import { addComment } from '../redux/commentSlice'
import { useSelector, useDispatch } from 'react-redux'
import { avatar } from '../redux/userSlice'

const BaseInput = () => {
  //const user = useSelector((state) => state.avatar)
  const dispatch = useDispatch()
  const [baseInput, setBaseInput] = useState('')

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    console.log('submit')
    dispatch(addComment(baseInput))
  }

  return (
    <div>
      <form onSubmit={handleCommentSubmit}>
        <img src={`src/${avatar}`} alt='avatar image' />
        <textarea onChange={(e) => setBaseInput(e.target.value)} />
        <button type='submit' value='Submit'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default BaseInput
