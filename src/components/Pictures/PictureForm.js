import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const PictureForm = ({ picture, handleSubmit, handleChange }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="title">
      <Form.Label>Title</Form.Label>
      <Form.Control
        placeholder='Enter picture title (optional)'
        // this name should line up with the state we want to change
        name='title'
        value={picture.title}
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group controlId="picture">
      <Form.Label>Picture</Form.Label>
      <Form.Control
        required
        placeholder='Enter direct image url'
        // this name should line up with the state we want to change
        name='picture'
        value={picture.picture}
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group controlId="description">
      <Form.Label>Description</Form.Label>
      <textarea
        rows="8"
        cols="60"
        placeholder='Enter picture description (optional)'
        // this name should line up with the state we want to change
        name='description'
        value={picture.description}
        onChange={handleChange}
      />
    </Form.Group>
    <Button variant='primary' type='submit'>Submit</Button>
  </Form>
)

export default PictureForm
