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
    <div>
      <form onSubmit={handleEditSubmit}>
        <textarea
          type='textarea'
          className='w-2/3'
          placeholder='Reply to this comment'
          onChange={handleEditChange}
          value={edit}
          ref={textareaRef}
        ></textarea>
        <button type='submit' value='Submit'>
          Update
        </button>
      </form>
    </div>
  )
}

export default EditTextArea