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

  const handleUpvoteClick = () => {
    dispatch(incrementScore(id, user))
    setIsScoreDisabled(true)
  }

  const handleDownvoteClick = () => {
    dispatch(decrementScore(id, user))
    setIsScoreDisabled(true)
  }

  return (
    <div className='h-full flex flex-col justify-center items-center'>
      <button onClick={handleUpvoteClick} disabled={isScoreDisabled}>
        <img src='src/images/icon-plus.svg' alt='upvote' />
      </button>
      <input type='text' value={score} className='text-center h-2/3' readOnly />
      <button onClick={handleDownvoteClick} disabled={isScoreDisabled}>
        <img src='src/images/icon-minus.svg' alt='downvote' />
      </button>
    </div>
  )
}

export default Counter
