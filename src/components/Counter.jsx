import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { incrementScore, decrementScore } from '../redux/commentSlice'

const Counter = ({
  score,
  id,
  comment,
  isScoreDisabled,
  setIsScoreDisabled,
}) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userReducer.user.username)

  useEffect(() => {
    checkHasVoted()
  }, [score, isScoreDisabled, setIsScoreDisabled, user]) || [comment?.hasVoted]

  const checkHasVoted = () => {
    if (comment?.hasVoted || isScoreDisabled) {
      setIsScoreDisabled(true)
    }
  }

  return (
    <div className='w-full bg-slate-400 rounded-md'>
      <button
        onClick={() => dispatch(incrementScore(id, user))}
        disabled={isScoreDisabled}
      >
        <i className='fas fa-arrow-up'></i>
      </button>
      <input type='text' value={score} readOnly />
      <button
        onClick={() => dispatch(decrementScore(id, user))}
        disabled={isScoreDisabled}
      >
        <i className='fas fa-arrow-down'></i>
      </button>
    </div>
  )
}

export default Counter
