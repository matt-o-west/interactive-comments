import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementScore, decrementScore } from '../redux/commentSlice'

const Counter = ({ children, id }) => {
  const comment = useSelector((state) =>
    state.commentReducer[0].comments.find((comment) => comment.id === id)
  )
  const dispatch = useDispatch()

  return (
    <div className='w-full bg-slate-400 rounded-md'>
      <button onClick={() => dispatch(incrementScore())}>
        <span className='font-bold text-slate-700'>+</span>
      </button>
      <input type='text' value={children} readOnly />
      <button onClick={() => dispatch(decrementScore())}>
        <span className='font-bold text-slate-700'>-</span>
      </button>
    </div>
  )
}

export default Counter
