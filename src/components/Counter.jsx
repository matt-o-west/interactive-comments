import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { incrementScore, decrementScore } from '../redux/commentSlice'

const Counter = ({ score, id, comment }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userReducer.user.username)
  const [isScoreDisabled, setIsScoreDisabled] = useState(false)

  console.log(comment)
  useEffect(() => {
    checkHasVoted()
  }, [])

  const checkHasVoted = () => {
    if (comment?.hasVoted) {
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
