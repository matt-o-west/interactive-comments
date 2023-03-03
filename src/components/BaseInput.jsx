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
    <>
      <form
        onSubmit={handleCommentSubmit}
        className='flex flex-row w-4/5 ml-5 justify-center items-center bg-white rounded-xl px-10 py-6 my-4 space-x-4 desktop:max-w-4xl tablet:max-w-3xl phone:max-w-md'
      >
        <img
          src={`src/${avatar}`}
          alt='avatar image'
          className='w-14 border-2 rounded-full border-moderate.blue self-start'
        />
        <textarea
          onChange={(e) => {
            setBaseInput(e.target.value)
          }}
          type='textarea'
          className='w-4/5 h-2/3 resize-none border border-gray-300 rounded-md py-6'
        />
        <button
          type='submit'
          value='Submit'
          className='btn-primary @apply self-start'
        >
          Submit
        </button>
      </form>
    </>
  )
}

export default BaseInput
