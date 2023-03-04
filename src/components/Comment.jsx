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
  //console.log(replyingTo)

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
      <div className='grid grid-cols-7 grid-rows-2 bg-white rounded-xl pb-2 pt-1 place-items-center my-4 desktop:max-w-4xl tablet:max-w-3xl tablet:mx-4 phone:max-w-md'>
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
            className='w-12 mx-4 pt-3'
          />
          <p className='w-1/5 font-medium mr-4'>{username}</p>
          {username === currentUser && (
            <span className='bg-moderate.blue text-white font-medium p-0.5 px-2 mx-6 rounded-sm'>
              me
            </span>
          )}
          <p className='font-light'>{getRelativeTime(createdAt)}</p>
        </div>
        <div className='col-span-2 flex'>
          {username === currentUser && (
            <button onClick={toggleEditTextarea} className='edit-btn'>
              <img
                src='src/images/icon-edit.svg'
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
              <span className='pl-3 tablet:pr-6'>Delete</span>
            </button>
          )}

          {username !== currentUser && (
            <button
              className='reply-btn hover:text-moderate.blue ml-20'
              onClick={toggleReplyTextarea}
            >
              <img src='src/images/icon-reply.svg' alt='reply icon' />
              <span className='pl-3'>Reply</span>
            </button>
          )}
        </div>
        <Modal
          isOpen={isModalOpen}
          handleCancelDelete={handleDeleteModalClose}
          handleConfirmDelete={handleConfirmDelete}
        />
        <div className='col-span-6 row-span-1 my-3 mx-4 justify-self-start'>
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

      <div className='border-l-4 desktop:ml-28 laptop:ml-24 tablet:ml-20'>
        {/* container for replies */}
        <div className='flex flex-col w-11/12 ml-6 min-w-11/12 tablet:ml-6'>
          {replies?.map((reply) => (
            <Comment key={reply.id} {...reply} comment={comment} />
          ))}
        </div>
        {!replyingTo && !replyTextArea && (
          <div className='ml-8 mr-16'>
            <ReplyTextArea
              comment={comment}
              replyTo={replyingTo}
              toggleReplyTextarea={toggleReplyTextarea}
            />
          </div>
        )}
      </div>

      {!replyTextArea && replyingTo && (
        <ReplyTextArea
          comment={comment}
          replyTo={replyingTo}
          toggleReplyTextarea={toggleReplyTextarea}
          user={user}
        />
      )}
    </>
  )
}

export default Comment
