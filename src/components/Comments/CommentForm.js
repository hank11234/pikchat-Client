import React from 'react'

const CommentForm = ({ comment, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <label>Comment</label>
    <input
      placeholder='Add comment'
      // this name should line up with the state we want to change
      name='comment'
      value={comment.comment}
      onChange={handleChange}
    />
    <button type='submit'>Submit</button>
  </form>
)

export default CommentForm
