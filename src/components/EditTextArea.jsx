import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { editComment } from '../redux/commentSlice'

const EditTextArea = ({ id, content, handleEditClick }) => {
  const [edit, setEdit] = useState(content)
  const dispatch = useDispatch()
  const textareaRef = useRef(null)

  useEffect(() => {
    textareaRef.current.focus()
  }, [])

  const handleEditChange = (e) => {
    setEdit(e.target.value)
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    console.log('edit')
    dispatch(editComment({ id, edit }))
    console.log(content)
    handleEditClick()
  }

  return (
    <>
      <form
        onSubmit={handleEditSubmit}
        className='flex flex-row gap-4 justify-center items-center desktop:w-[700px] desktop:pr-20 laptop:w-[525px] tablet:w-[480px] phone:w-[240px] '
      >
        <textarea
          className='w-4/5 h-2/3 resize-none border border-gray-300 rounded-md py-4 px-2 tablet:max-h-32 tablet:px-2 phone:py-1 phone:px-1'
          type='textarea'
          placeholder='Reply to this comment'
          onChange={handleEditChange}
          value={edit}
          ref={textareaRef}
        />
        <button
          type='submit'
          value='Submit'
          className='btn-primary @apply self-start'
        >
          Update
        </button>
      </form>
    </>
  )
}

export default EditTextArea
