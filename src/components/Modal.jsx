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
    <div className='fixed z-10 inset-0 overflow-y-auto'>
      <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        {/*Background overlay*/}
        <div className='fixed inset-0 transition-opacity'>
          <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
        </div>

        {/*Modal*/}
        <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
          <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
            <div className='sm:flex sm:items-start'>
              {/*Icon*/}
              <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                {/*Heroicon name: exclamation*/}
                <img
                  src='src/images/icon-delete.svg'
                  alt='delete icon'
                  className='w-5'
                />
              </div>

              {/*Confirmation message*/}
              <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                <h3
                  className='text-lg leading-6 font-medium text-gray-900'
                  id='modal-title'
                >
                  Delete this item?
                </h3>
                <div className='mt-2'>
                  <p className='text-sm leading-5 text-gray-500'>
                    Are you sure you want to delete this item? This action
                    cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
            <span className='flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto'>
              <button
                type='button'
                className='btn-secondary py-2 px-4 w-full rounded-md hover:bg-soft.red text-white focus:outline-none focus:shadow-outline-red transition duration-150 ease-in-out sm:text-sm sm:leading-5'
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </span>
            <span class='mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto'>
              <button
                type='button'
                className='btn-tertiary py-2 px-4 w-full rounded-md hover:bg-inherit bg-light.gray text-gray-700 focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out sm:text-sm sm:leading-5'
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteCommentModal
