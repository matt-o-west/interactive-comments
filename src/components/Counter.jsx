import React from 'react'
import { useDispatch } from 'react-redux'
import { incrementScore, decrementScore } from '../redux/commentSlice'

const Counter = ({ children, id, score }) => {
  const dispatch = useDispatch()
  console.log(id)

  return (
    <div className='w-full bg-slate-400 rounded-md'>
      <button onClick={() => dispatch(incrementScore(id))}>
        <span className='font-bold text-slate-700'>+</span>
      </button>
      <input type='text' value={children} readOnly />
      <button onClick={() => dispatch(decrementScore(id))}>
        <span className='font-bold text-slate-700'>-</span>
      </button>
    </div>
  )
}

export default Counter
