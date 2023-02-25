import React, { useState } from 'react'
import Counter from './Counter'
import { removeComment } from '../redux/commentSlice'
import { useSelector, useDispatch } from 'react-redux'
import ReplyTextArea from './ReplyTextArea'
import EditTextArea from './EditTextArea'
import Modal from './Modal'
import { getRelativeTime } from '../utils/getRelativeTime'

const Comment = ({
  content,
  createdAt,
  score,
  replies,
  id,
  comment,
  user,
  replyingTo,
}) => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.userReducer.user.username)
  const [replyTextArea, setReplyTextArea] = useState(true)
  const [editTextArea, setEditTextArea] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const [isScoreDisabled, setIsScoreDisabled] = useState(false)
  const { username } = user
  console.log(replyingTo)

  const handleDeleteModalOpen = () => {
    setModalOpen(true)
  }

  const handleDeleteModalClose = () => {
    setModalOpen(false)
  }

  const handleConfirmDelete = () => {
    dispatch(removeComment({ id, isReply: replyingTo ? true : false }))
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
      <div className='grid grid-cols-6 grid-rows-2 place-items-center'>
        <div className='col-span-1 row-span-2'>
          <Counter
            score={score}
            id={id}
            comment={comment}
            isScoreDisabled={isScoreDisabled}
            setIsScoreDisabled={setIsScoreDisabled}
          ></Counter>
        </div>
        <div className='col-span-3 row-span-1 w-full items-center'>
          <img
            src={`src/images/avatars/image-${usernameCheck()}.png`}
            alt='avatar image'
            className='px-5'
          />
          <p className='w-1/4'>{username}</p>
          {username === currentUser && <i>me</i>}
          <p>{getRelativeTime(createdAt)}</p>
        </div>

        {username === currentUser && (
          <button onClick={toggleEditTextarea} className='submitButton'>
            Edit
          </button>
        )}
        {username === currentUser && (
          <button onClick={handleDeleteModalOpen} className='submitButton'>
            Delete
          </button>
        )}
        <button className='btn-primary @apply' onClick={toggleReplyTextarea}>
          Reply
        </button>
        <Modal
          isOpen={isModalOpen}
          handleCancelDelete={handleDeleteModalClose}
          handleConfirmDelete={handleConfirmDelete}
        />
        <div className='col-span-4 row-span-1'>
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
        {!replyTextArea && (
          <ReplyTextArea comment={comment} replyTo={replyingTo} />
        )}
      </div>
      <div className='w-2/3'>
        {replies?.map((reply) => (
          <Comment key={reply.id} {...reply} comment={comment} />
        ))}
      </div>
    </>
  )
}

export default Comment
