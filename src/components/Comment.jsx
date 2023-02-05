import React from 'react'

const Comment = ({
  id,
  content,
  createdAt,
  score,
  user,
  username,
  replies,
}) => {
  return (
    <>
      <div className='grid grid-cols-3 grid-rows-2'>
        <div className='col-span-1 row-span-2'>
          <Counter>{score}</Counter>
        </div>
        <div className='col-span-1 row-span-1'>
          <img src={user.image.png} alt='avatar image' />
          <p>{username}</p>
          <p>{createdAt}</p>
        </div>
        <button className='btn btn-primary'>Reply</button>
        <div className='col-span-2 row-span-1'>
          <p>{content}</p>
        </div>
      </div>
      {replies && replies.map((reply) => <Comment {...reply} />)}
    </>
  )
}

export default Comment
