import React, { useState } from 'react'
import Counter from './Counter'
import { addComment, removeComment, editComment } from '../redux/commentSlice'
import { useSelector, useDispatch } from 'react-redux'
import ReplyTextArea from './ReplyTextArea'
import Modal from './Modal'
import { getRelativeTime } from '../utils/getRelativeTime'

const Comment = ({ content, createdAt, score, replies, id, comment }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userReducer.user.username)
  const [replyTextArea, setReplyTextArea] = useState(true)
  const [isModalOpen, setModalOpen] = useState(false)

  const handleDeleteClick = () => {
    setModalOpen(true)
  }

  const handleCancelDelete = () => {
    setModalOpen(false)
  }

  const handleConfirmDelete = () => {
    dispatch(removeComment(id))
    setTimeout(() => {
      setModalOpen(false)
    }, 300)
  }

  const handleReplyClick = () => {
    console.log(replyTextArea)
    setReplyTextArea(!replyTextArea)
  }

  return (
    <>
      <div className='grid grid-cols-3 grid-rows-2'>
        <div className='col-span-1 row-span-2'>
          <Counter score={score} id={id} comment={comment}></Counter>
        </div>
        <div className='col-span-1 row-span-1'>
          <img
            src={`src/images/avatars/image-${user}.png`}
            alt='avatar image'
          />
          <p>{user}</p>
          <p>{getRelativeTime(createdAt)}</p>
        </div>
        <button className='btn btn-primary' onClick={handleReplyClick}>
          Reply
        </button>
        <button onClick={handleDeleteClick}>Delete</button>
        <Modal
          isOpen={isModalOpen}
          handleCancelDelete={handleCancelDelete}
          handleConfirmDelete={handleConfirmDelete}
        />
        <div className='col-span-2 row-span-1'>
          <p>{content}</p>
        </div>
        {!replyTextArea && <ReplyTextArea />}
        <div className='w-2/3'>
          {replies?.map((reply) => (
            <Comment key={reply.id} {...reply} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Comment
