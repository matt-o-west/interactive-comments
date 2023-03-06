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
        className='flex flex-row w-4/5 ml-2 justify-center items-center bg-white rounded-xl px-10 py-6 my-4 space-x-4 desktop:max-w-4xl tablet:flex tablet:flex-row tablet:space-x-4 tablet:max-w-3xl phone:max-w-md phone:w-11/12 phone:grid phone:grid-rows-auto phone:grid-cols-2 phone:pl-4 phone:pr-4 phone:py-4 phone:pt-0 phone:space-x-0 phone:space-y-4'
      >
        <img
          src={`src/${avatar}`}
          alt='avatar image'
          className='w-14  rounded-full self-start phone:row-span-1 phone:row-start-2 phone:col-start-1 phone:w-9 phone:ml-4 phone:mt-4'
        />
        <textarea
          onChange={(e) => {
            setBaseInput(e.target.value)
          }}
          type='textarea'
          className='w-4/5 h-2/3 resize-none border border-gray-300 rounded-md py-6 px-4 phone:w-full phone:row-span-1 phone:col-span-2'
          placeholder='Add a public comment...'
        />
        <button
          type='submit'
          value='Submit'
          className='btn-primary @apply self-start  phone:row-span-1 phone:row-start-2 phone:col-start-2'
        >
          Send
        </button>
      </form>
    </>
  )
}

export default BaseInput
