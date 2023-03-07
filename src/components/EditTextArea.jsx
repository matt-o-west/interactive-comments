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

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === 'Done') {
      e.preventDefault()
      e.target.form.dispatchEvent(new Event('submit', { cancelable: true }))
    }
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    console.log('edit')
    dispatch(editComment({ id, edit }))
    console.log(content)
    handleEditClick()
  }

  const handleBlur = (e) => {
    e.preventDefault()
    e.target.form.dispatchEvent(new Event('submit', { cancelable: true }))
  }

  return (
    <>
      <form
        onSubmit={handleEditSubmit}
        className='flex flex-row gap-4 justify-center items-center pt-2 desktop:w-[650px] desktop:pr-20 laptop:w-[525px] tablet:w-[460px] phone:w-65'
      >
        <textarea
          className='w-4/5 h-2/3 resize-none border border-gray-300 rounded-md py-4 px-2 tablet:max-h-32 tablet:px-2 phone:py-1 phone:px-1 phone:w-full phone:h-28'
          type='textarea'
          placeholder='Reply to this comment'
          onChange={handleEditChange}
          value={edit}
          ref={textareaRef}
          onKeyDown={handleEditKeyDown}
          onBlur={handleBlur}
        />
        <button
          type='submit'
          value='Submit'
          className='btn-primary @apply self-start tablet:block tablet:mr-2 phone:hidden'
        >
          Update
        </button>
      </form>
    </>
  )
}

export default EditTextArea
