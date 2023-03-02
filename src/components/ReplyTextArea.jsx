import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addReply } from '../redux/commentSlice'
import { avatar } from '../redux/userSlice'

const ReplyTextArea = ({ comment, replyTo, toggleReplyTextarea }) => {
  const [reply, setReply] = useState('')
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userReducer.user.username)
  const textareaRef = useRef(null)
  //console.log(comment)
  const replies = comment.replies ? comment.replies : comment

  useEffect(() => {
    textareaRef.current.focus()
  }, [])

  const handleReplySubmit = (e) => {
    e.preventDefault()
    console.log('submit', {
      replies: comment.replies ? comment.replies : comment, // if comment has replies, use the replies array, otherwise use the comment object
      reply: reply,
      user: user,
    })

    dispatch(
      addReply({
        id: comment.id,
        reply: reply,
        user: user,
        replyingTo: replyTo,
      })
    )
    setReply('')
    toggleReplyTextarea()
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
        <button type='submit' value='Submit' className='btn-primary @apply'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default ReplyTextArea
