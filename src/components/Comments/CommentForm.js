import React from 'react'
import './Comments.scss'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CommentForm = ({ comment, handleSubmit, handleChange }) => (
  <Form onSubmit={handleSubmit}>
    <textarea
      placeholder='Comment'
      rows="8"
      cols="60"
      // this name should line up with the state we want to change
      name='comment'
      value={comment.comment}
      onChange={handleChange}
    />
    <Button type='submit' className='commentSubmit' style={{ marginLeft: '10px', marginBottom: '30px' }}>Submit</Button>
  </Form>
)

export default CommentForm
