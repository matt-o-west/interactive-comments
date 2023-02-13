import React, { useState } from 'react'
import Counter from './Counter'
import { addComment, removeComment, editComment } from '../redux/commentSlice'
import ReplyTextArea from './ReplyTextArea'
import Modal from './Modal'

const Comment = ({ content, createdAt, score, user, replies, id, comment }) => {
  const { username } = user
  const [replyTextArea, setReplyTextArea] = useState(true)
  const [isModalOpen, setModalOpen] = useState(false)

  const handleDeleteClick = () => {
    setModalOpen(true)
  }

  const handleCancelDelete = () => {
    setModalOpen(false)
  }

  const handleConfirmDelete = () => {
    setModalOpen(false)
    onDelete()
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
            src={`src/images/avatars/image-${username}.png`}
            alt='avatar image'
          />
          <p>{username}</p>
          <p>{createdAt}</p>
        </div>
        <button className='btn btn-primary' onClick={handleReplyClick}>
          Reply
        </button>
        <button onClick={handleDeleteClick}>Delete</button>
        <Modal
          isOpen={isModalOpen}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
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
