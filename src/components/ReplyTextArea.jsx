import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addReply } from '../redux/commentSlice'
import { avatar } from '../redux/userSlice'

const ReplyTextArea = ({
  comment,
  replyTo,
  toggleReplyTextarea,
  replyToUser,
}) => {
  const [reply, setReply] = useState('')
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userReducer.user.username)
  const textareaRef = useRef(null)
  console.log(replyTo, replyToUser)
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
        replyingTo: replyTo || replyToUser,
      })
    )
    setReply('')
    toggleReplyTextarea()
  }

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === 'Done') {
      e.preventDefault()
      e.target.form.dispatchEvent(new Event('submit', { cancelable: true }))
    }
  }

  return (
    <>
      <form
        onSubmit={handleReplySubmit}
        className='flex flex-row w-full ml-6 justify-center items-center bg-white rounded-xl px-10 py-6 my-4 space-x-4 desktop:max-w-3xl desktop:w-full laptop:w-11/12 laptop:ml-4 tablet:max-w-2xl tablet:ml-6 phone:max-w-sm phone:px-4 phone:ml-2'
      >
        <img
          src={`src/${avatar}`}
          className='self-start w-10 tablet:block phone:hidden'
        />
        <textarea
          type='textarea'
          className='col-span-2 w-4/5 h-2/3 resize-none border border-gray-300 rounded-md py-4 px-4'
          placeholder='Reply to this comment'
          onChange={handleReplyChange}
          value={reply}
          ref={textareaRef}
          onKeyDown={handleEditKeyDown}
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
