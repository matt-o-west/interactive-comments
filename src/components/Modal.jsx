import React, { useState } from 'react'

const DeleteCommentModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <p>Are you sure you want to delete this comment?</p>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onConfirm}>Confirm</button>
      </div>
    </div>
  )
}

export default DeleteCommentModal
