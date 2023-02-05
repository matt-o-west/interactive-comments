import React from 'react'

const ReplyInput = () => {
  return (
    <>
      <div className='grid grid-cols-3 grid-rows-2'>
        <div className='col-span-1 row-span-2'>
          <img
            src='../assets/avatars/image-ramsesmiron.png'
            alt='avatar image'
          />
        </div>
        <div className='col-span-1 row-span-1'>
          <input type='text' placeholder='Add a comment...' />
        </div>
        <div className='col-span-1 row-span-1'>
          <button className='btn btn-primary'>Reply</button>
        </div>
      </div>
    </>
  )
}

export default ReplyInput
