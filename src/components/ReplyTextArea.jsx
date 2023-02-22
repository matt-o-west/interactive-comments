import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addReply } from '../redux/commentSlice'
import { avatar } from '../redux/userSlice'

const ReplyTextArea = ({ comment }) => {
  const [reply, setReply] = useState('')
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userReducer.user.username)
  const textareaRef = useRef(null)
  //console.log(comment)

  useEffect(() => {
    textareaRef.current.focus()
  }, [])

  const handleReplyChange = (e) => {
    setReply(e.target.value)
  }

  const handleReplySubmit = (e) => {
    e.preventDefault()
    console.log('submit', {
      comment: comment.replies ? comment.replies : comment, // if comment has replies, use the replies array, otherwise use the comment object
      reply: reply,
      user: user,
    })
    const replies = comment.replies ? comment.replies : comment
    dispatch(addReply({ replies: replies, reply: reply, user: user }))
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
