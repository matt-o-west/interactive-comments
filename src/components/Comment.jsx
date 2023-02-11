import React, { useState } from 'react'
import Counter from './Counter'
import { addComment, removeComment, editComment } from '../redux/commentSlice'
import ReplyTextArea from './ReplyTextArea'

const Comment = ({ content, createdAt, score, user, replies, id, comment }) => {
  const { username } = user
  const [replyTextArea, setReplyTextArea] = useState(false)
  console.log(score)

  const handleReplyClick = () => {
    console.log('reply')

    return (
      <div>
        <textarea></textarea>
      </div>
    )
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
        <button className='btn btn-primary'>Reply</button>
        <div className='col-span-2 row-span-1'>
          <p>{content}</p>
        </div>
        <div className='w-2/3'>
          {replies?.map((reply) => (
            <Comment key={reply.id} {...reply} />
          ))}
          <ReplyTextArea hidden={replyTextArea} />
        </div>
      </div>
    </>
  )
}

export default Comment
