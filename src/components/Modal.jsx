import React, { useState } from 'react'

const DeleteCommentModal = ({
  isOpen,
  handleCancelDelete,
  handleConfirmDelete,
}) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <p>Are you sure you want to delete this comment?</p>
        <button onClick={handleCancelDelete}>Cancel</button>
        <button onClick={handleConfirmDelete}>Confirm</button>
      </div>
    </div>
  )
}

export default DeleteCommentModal
