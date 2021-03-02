import React from 'react'
import './Comments.scss'

const CommentForm = ({ comment, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <textarea
      placeholder='Comment'
      rows="8"
      cols="60"
      // this name should line up with the state we want to change
      name='comment'
      value={comment.comment}
      onChange={handleChange}
    />
    <button type='submit' className='commentSubmit'>Submit</button>
  </form>
)

export default CommentForm
