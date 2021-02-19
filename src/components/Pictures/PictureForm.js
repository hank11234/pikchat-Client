import React from 'react'

const PictureForm = ({ picture, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <label>Title</label>
    <input
      required
      placeholdder='Enter picture title (optional)'
      // this name should line up with the state we want to change
      name='title'
      value={picture.title}
      onChange={handleChange}
    />
    <label>Picture</label>
    <input
      required
      placeholdder='Enter direct image url'
      // this name should line up with the state we want to change
      name='picture'
      value={picture.picture}
      onChange={handleChange}
    />
    <label>Description</label>
    <input
      required
      placeholdder='Enter picture description (optional)'
      // this name should line up with the state we want to change
      name='description'
      value={picture.description}
      onChange={handleChange}
    />
    <button type='submit'>Submit</button>
  </form>
)

export default PictureForm
