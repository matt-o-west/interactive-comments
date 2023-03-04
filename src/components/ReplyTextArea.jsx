import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addReply } from '../redux/commentSlice'
import { avatar } from '../redux/userSlice'

const ReplyTextArea = ({
  comment,
  replyTo,
  toggleReplyTextarea,
  parentCommentUser,
}) => {
  const [reply, setReply] = useState('')
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userReducer.user.username)
  const textareaRef = useRef(null)
  //console.log(comment)
  const replies = comment.replies ? comment.replies : comment

  useEffect(() => {
    textareaRef.current.focus()
  }, [])

  const handleReplyChange = (e) => {
    const value = e.target.value
    setReply(
      value.replace(`@${replyTo}`, `<span class="reply-tag">@${replyTo}</span>`)
    )
  }

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
        parentCommentUser: parentCommentUser,
      })
    )
    setReply('')
    toggleReplyTextarea()
  }

  return (
    <>
      <form
        onSubmit={handleReplySubmit}
        className='flex flex-row full ml-2 justify-center items-center bg-white rounded-xl px-10 py-6 my-4 space-x-4 desktop:max-w-4xl tablet:max-w-3xl phone:max-w-md'
      >
        <img src={`src/${avatar}`} />
        <textarea
          type='textarea'
          className='col-span-2 w-4/5 h-2/3 resize-none border border-gray-300 rounded-md py-4 px-4'
          placeholder='Reply to this comment'
          onChange={handleReplyChange}
          value={reply}
          ref={textareaRef}
        ></textarea>
        <button
          type='submit'
          value='Submit'
          className='btn-primary @apply self-start'
        >
          Reply
        </button>
      </form>
    </>
  )
}

export default ReplyTextArea
