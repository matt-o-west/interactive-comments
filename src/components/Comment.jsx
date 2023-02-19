import React, { useState } from 'react'
import Counter from './Counter'
import { removeComment, editComment } from '../redux/commentSlice'
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
  //console.log(username)

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
    }, 200)
  }

  const handleReplyClick = () => {
    console.log(replyTextArea)
    setReplyTextArea(!replyTextArea)
  }

  const handleEditClick = () => {
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
        <button className='btn btn-primary' onClick={handleReplyClick}>
          Reply
        </button>
        {username === currentUser && (
          <button onClick={handleEditClick}>Edit</button>
        )}
        {username === currentUser && (
          <button onClick={handleDeleteClick}>Delete</button>
        )}

        <Modal
          isOpen={isModalOpen}
          handleCancelDelete={handleCancelDelete}
          handleConfirmDelete={handleConfirmDelete}
        />
        <div className='col-span-2 row-span-1'>
          {editTextArea ? (
            <EditTextArea
              id={id}
              content={content}
              handleEditClick={handleEditClick}
            />
          ) : (
            <p>{content}</p>
          )}
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
