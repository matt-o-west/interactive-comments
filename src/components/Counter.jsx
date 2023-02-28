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
    <div className='h-full w-12 rounded-lg flex flex-col justify-center items-center py-2 bg-light.gray'>
      <button
        onClick={handleUpvoteClick}
        disabled={isScoreDisabled}
        className='p-3 py-2'
      >
        <img src='src/images/icon-plus.svg' alt='upvote' />
      </button>
      <input
        type='text'
        value={score}
        className='text-center text-moderate.blue font-medium w-2/5 bg-light.gray mr-0.5 mt-1.5 mb-0.5 ml-0.5'
        readOnly
      />
      <button
        onClick={handleDownvoteClick}
        disabled={isScoreDisabled}
        className='p-3'
      >
        <img src='src/images/icon-minus.svg' alt='downvote' />
      </button>
    </div>
  )
}

export default Counter
