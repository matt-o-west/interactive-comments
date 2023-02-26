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
  }, [comment?.hasVoted, isScoreDisabled])

  console.log('isScoreDisabled', isScoreDisabled)

  const checkHasVoted = () => {
    if (!comment?.hasVoted) {
      setIsScoreDisabled(false)
    } else {
      setIsScoreDisabled(true)
    }
  }

  const handleUpvoteClick = () => {
    console.log('Upvote')
    dispatch(incrementScore(id, user))
    setIsScoreDisabled(true)
  }

  const handleDownvoteClick = () => {
    console.log('Downvote')
    dispatch(decrementScore(id, user))
    setIsScoreDisabled(true)
  }

  return (
    <div className='h-full ml-6 w-14 rounded-lg flex flex-col justify-center items-center py-3 bg-dark.gray relative z-10'>
      <button
        onClick={(e) => console.log('Clicked', e)}
        disabled={isScoreDisabled}
        className='p-3 py-2 relative z-10'
      >
        <img src='src/images/icon-plus.svg' alt='upvote' />
      </button>
      <input
        type='text'
        value={score}
        className='text-center w-2/5 bg-dark.gray'
        readOnly
      />
      <button
        onClick={(e) => console.log('Clicked', e)}
        disabled={isScoreDisabled}
        className='p-3'
      >
        <img src='src/images/icon-minus.svg' alt='downvote' />
      </button>
    </div>
  )
}

export default Counter
