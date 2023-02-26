import React, { useState } from 'react'
import { addComment, resetState } from '../redux/commentSlice'
import { useSelector, useDispatch } from 'react-redux'
import { avatar } from '../redux/userSlice'

const BaseInput = () => {
  // note to self: access to objects in each slice has to be done via name given to the reducer contained in store.js
  const user = useSelector((state) => state.userReducer.user)
  const dispatch = useDispatch()
  const [baseInput, setBaseInput] = useState('')

  //console.log(user)

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    console.log('submit', baseInput, user)
    dispatch(addComment({ input: baseInput, user: user.username }))
  }

  return (
    <div>
      <form onSubmit={handleCommentSubmit}>
        <img src={`src/${avatar}`} alt='avatar image' />
        <textarea
          onChange={(e) => {
            setBaseInput(e.target.value)
          }}
        />
        <button type='submit' value='Submit' className='btn-primary @apply'>
          Submit
        </button>
      </form>
      <button
        type='button'
        onClick={() => dispatch(resetState())}
        className='btn-primary @apply'
      >
        Reset
      </button>
    </div>
  )
}

export default BaseInput
