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
  const isReply = replyingTo ? true : false

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
      <div
        className={`grid grid-cols-7 grid-rows-2 bg-white rounded-xl pb-2 pt-1 place-items-center my-4 desktop:w-full tablet:grid-rows-2 tablet:grid-cols-7 tablet:max-w-2xl tablet:mx-4 phone:max-w-sm phone:grid-rows-auto phone:grid-cols-4 phone:ml-2 phone:mr-4 phone:my-2 phone:py-0 phone:px-3 ${
          !isReply ? 'desktop:parent-comment' : ''
        }`}
      >
        <div className='flex col-span-1 row-span-2 tablet:row-span-2 phone:col-start-1 phone:row-start-3 phone:row-span-1'>
          <Counter
            score={score}
            id={id}
            comment={comment}
            isScoreDisabled={isScoreDisabled}
            setIsScoreDisabled={setIsScoreDisabled}
          ></Counter>
        </div>
        <div className='flex flex-row col-span-4 row-span-1 w-full items-center my-2'>
          <img
            src={`src/images/avatars/image-${usernameCheck()}.png`}
            alt='avatar image'
            className='w-12 mx-4 pt-3'
          />
          <p className='w-1/5 font-medium mr-4 phone:mr-8'>{username}</p>
          {username === currentUser && (
            <span className='bg-moderate.blue text-white font-medium p-0.5 px-2 mx-6 rounded-sm'>
              me
            </span>
          )}
          <p className='font-light'>{getRelativeTime(createdAt)}</p>
        </div>
        <div className='flex tablet:col-span-2 tablet:col-start-6 tablet:row-start-1 tablet:mr-0 phone:col-start-4 phone:row-start-3 phone:mr-24 phone:mb-4'>
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
              className='reply-btn hover:text-moderate.blue ml-20  phone:col-start-3 phone:row-start-3'
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
        <div className='col-span-6 row-span-1 my-3 mx-4 justify-self-start phone:my-0 phone:pb-4 tablet:col-start-2 phone:col-start-1 phone:row-start-2'>
          {editTextArea ? (
            <EditTextArea
              id={id}
              content={content}
              handleEditClick={toggleEditTextarea}
            />
          ) : (
            <p>
              {content.split(' ')[0].startsWith('@') ? (
                <>
                  <span className=' text-moderate.blue rounded-sm p-1 font-bold'>
                    {content.split(' ')[0]}
                  </span>{' '}
                  {content.slice(content.indexOf(' ') + 1)}
                </>
              ) : (
                content
              )}
            </p>
          )}
        </div>
      </div>

      <div className='border-l-4 desktop:ml-14 desktop:pl-8 laptop:ml-32 tablet:ml-20 phone:ml-10 phone:pl-2'>
        {/* container for replies */}
        <div className='flex flex-col desktop:w-full desktop:mx-0 laptop:w-11/12 laptop:ml-1 laptop:pr-4 tablet:w-11/12 tablet:ml-6 tablet:pr-0 phone:w-full phone:pr-2'>
          {replies?.map((reply) => (
            <Comment key={reply.id} {...reply} comment={comment} />
          ))}
        </div>
        {!replyingTo && !replyTextArea && (
          <div className='w-11/12 tablet:mr-80 phone:px-0 phone:mr-20'>
            <ReplyTextArea
              comment={comment}
              toggleReplyTextarea={toggleReplyTextarea}
              replyToUser={username}
            />
          </div>
        )}
      </div>

      {!replyTextArea && replyingTo && (
        <ReplyTextArea
          comment={comment}
          toggleReplyTextarea={toggleReplyTextarea}
          replyToUser={username}
        />
      )}
    </>
  )
}

export default Comment
