import React from 'react'
import { useDispatch } from 'react-redux'
import { incrementScore, decrementScore } from '../redux/commentSlice'

const Counter = ({ score, id, comment }) => {
  const dispatch = useDispatch()
  //console.log(comment)

  return (
    <div className='w-full bg-slate-400 rounded-md'>
      <button onClick={() => dispatch(incrementScore(id))}>
        <span className='font-bold text-slate-700'>+</span>
      </button>
      <input type='text' value={score} readOnly />
      <button onClick={() => dispatch(decrementScore(id))}>
        <span className='font-bold text-slate-700'>-</span>
      </button>
    </div>
  )
}

export default Counter
