import React from 'react'
import { useDispatch } from 'react-redux'
import { incrementScore, decrementScore } from '../redux/commentSlice'

const Counter = ({ children, id, score }) => {
  const dispatch = useDispatch()
  console.log(score)

  return (
    <div className='w-full bg-slate-400 rounded-md'>
      <button
        onClick={() => dispatch(incrementScore({ id: id, score: score }))}
      >
        <span className='font-bold text-slate-700'>+</span>
      </button>
      <input type='text' value={children} readOnly />
      <button
        onClick={() => dispatch(decrementScore({ id: id, score: score }))}
      >
        <span className='font-bold text-slate-700'>-</span>
      </button>
    </div>
  )
}

export default Counter
