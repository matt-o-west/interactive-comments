import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addReply } from '../redux/commentSlice'
import { avatar } from '../redux/userSlice'

const ReplyTextArea = ({ comment }) => {
  const [reply, setReply] = useState('')
  const dispatch = useDispatch()
  const textareaRef = useRef(null)

  useEffect(() => {
    textareaRef.current.focus()
  }, [])

  const handleReplyChange = (e) => {
    setReply(e.target.value)
  }

  const handleReplySubmit = (e) => {
    e.preventDefault()
    console.log('submit')
    dispatch(addReply({ comment, reply }))
  }

  return (
    <div>
      <img src={`src/${avatar}`} />
      <form onSubmit={handleReplySubmit}>
        <textarea
          type='textarea'
          className='w-2/3'
          placeholder='Reply to this comment'
          onChange={handleReplyChange}
          value={reply}
          ref={textareaRef}
        ></textarea>
        <button type='submit' value='Submit'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default ReplyTextArea
