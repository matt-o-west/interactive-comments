import React, { useState } from 'react'
import Counter from './Counter'
import { removeComment } from '../redux/commentSlice'
import { useSelector, useDispatch } from 'react-redux'
import ReplyTextArea from './ReplyTextArea'
import EditTextArea from './EditTextArea'
import Modal from './Modal'
import { getRelativeTime } from '../utils/getRelativeTime'

const Comment = ({ content, createdAt, score, replies, id, comment, user }) => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.userReducer.user.username)
  const [replyTextArea, setReplyTextArea] = useState(true)
  const [editTextArea, setEditTextArea] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const { username } = user
  console.log(comment)

  const handleDeleteModalOpen = () => {
    setModalOpen(true)
  }

  const handleDeleteModalClose = () => {
    setModalOpen(false)
  }

  const handleConfirmDelete = () => {
    dispatch(removeComment(id))
    setTimeout(() => {
      setModalOpen(false)
    }, 200)
  }

  const toggleReplyTextarea = () => {
    console.log(replyTextArea)
    setReplyTextArea(!replyTextArea)
  }

  const toggleEditTextarea = () => {
    console.log('edit')
    setEditTextArea(!editTextArea)
  }

  const usernameCheck = () => {
    return username ? username : currentUser
  }

  return (
    <>
      <div className='grid grid-cols-3 grid-rows-2'>
        <div className='col-span-1 row-span-2'>
          <Counter score={score} id={id} comment={comment}></Counter>
        </div>
        <div className='col-span-1 row-span-1'>
          <img
            src={`src/images/avatars/image-${usernameCheck()}.png`}
            alt='avatar image'
          />
          <p>{username}</p>
          <p>{getRelativeTime(createdAt)}</p>
        </div>
        <button className='btn btn-primary' onClick={toggleReplyTextarea}>
          Reply
        </button>
        {username === currentUser && (
          <button onClick={toggleEditTextarea}>Edit</button>
        )}
        {username === currentUser && (
          <button onClick={handleDeleteModalOpen}>Delete</button>
        )}

        <Modal
          isOpen={isModalOpen}
          handleCancelDelete={handleDeleteModalClose}
          handleConfirmDelete={handleConfirmDelete}
        />
        <div className='col-span-2 row-span-1'>
          {editTextArea ? (
            <EditTextArea
              id={id}
              content={content}
              handleEditClick={toggleEditTextarea}
            />
          ) : (
            <p>{content}</p>
          )}
        </div>
        {!replyTextArea && <ReplyTextArea comment={comment} />}
        <div className='w-2/3'>
          {replies?.map((reply) => (
            <Comment key={reply.id} {...reply} comment={comment} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Comment
