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
      <div className='grid grid-cols-7 grid-rows-2 place-items-center my-8 desktop:max-w-5xl tablet:max-w-4xl phone:max-w-md'>
        <div className='col-span-1 row-span-2'>
          <Counter
            score={score}
            id={id}
            comment={comment}
            isScoreDisabled={isScoreDisabled}
            setIsScoreDisabled={setIsScoreDisabled}
          ></Counter>
        </div>
        <div className='flex flex-row col-span-4 row-span-1 w-full items-center'>
          <img
            src={`src/images/avatars/image-${usernameCheck()}.png`}
            alt='avatar image'
            className='px-5'
          />
          <p className='w-1/5 font-medium'>{username}</p>
          {username === currentUser && (
            <span className='bg-moderate.blue text-white font-medium p-0.5 px-2 rounded-sm mr-8'>
              me
            </span>
          )}
          <p className='font-light'>{getRelativeTime(createdAt)}</p>
        </div>
        <div className='col-span-2 flex'>
          {username === currentUser && (
            <button onClick={toggleEditTextarea} className='edit-btn'>
              <img
                src='src/images/icon-reply.svg'
                alt='reply icon'
                className='fill-current'
              />
              <span className='pl-3'>Edit</span>
            </button>
          )}
          {username === currentUser && (
            <button
              onClick={handleDeleteModalOpen}
              className='delete-btn hover:text-pale.red'
            >
              <img
                src='src/images/icon-delete.svg'
                alt='delete icon'
                className='fill-current'
              />
              <span className='pl-3'>Delete</span>
            </button>
          )}

          {username !== currentUser && (
            <button
              className='btn-primary @apply'
              onClick={toggleReplyTextarea}
            >
              Reply
            </button>
          )}
        </div>
        <Modal
          isOpen={isModalOpen}
          handleCancelDelete={handleDeleteModalClose}
          handleConfirmDelete={handleConfirmDelete}
        />
        <div className='col-span-6 row-span-1'>
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
      </div>
      {!replyTextArea && (
        <ReplyTextArea comment={comment} replyTo={replyingTo} />
      )}
      <div className='w-1/2 ml-16'>
        {replies?.map((reply) => (
          <Comment key={reply.id} {...reply} comment={comment} />
        ))}
      </div>
    </>
  )
}

export default Comment
