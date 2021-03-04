import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import PictureForm from './PictureForm'
import { pictureCreate } from '../../api/pictures'

class PictureCreate extends Component {
  constructor (props) {
    super(props)
    // initially our movies title and director will be empty until they are filled in
    this.state = {
      picture: {
        title: '',
        picture: '',
        description: ''
      },
      // createdId will be null, until we successfully create a movie
      createdId: null
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const { user, msgAlert } = this.props
    const { picture } = this.state
    // create a movie, pass it the movie data and the user for its token
    pictureCreate(picture, user)
      // set the createdId to the id of the movie we just created
      // .then(res => this.setState({ createdId: res.data.movie.id }))
      .then(res => {
        this.setState({ createdId: res.data.picture.id })
        // pass the response to the next .then so we can show the title
        return res
      })
      .then(res => msgAlert({
        heading: 'Added new picture successfully',
        message: `Picture has been added successfully. Now viewing ${res.data.picture.title}.`,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to add picture',
          message: 'Could not add picture with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  // when an input changes, update the state that corresponds with the input's name
  handleChange = event => {
    // in react, an event is actually a SyntheticEvent
    // to ensure the properties are not set to null after handleChange is finished
    // we must call event.persist
    event.persist()
    this.setState(state => {
      // return our state changge
      return {
        // set the movie state, to what it used to be (...state.movie)
        // but replace the property with `name` to its current `value`
        // ex. name could be `title` or `director`
        picture: { ...state.picture, [event.target.name]: event.target.value }
      }
    })
  }

  render () {
    // destructure our movie and createdId state
    const { picture, createdId } = this.state
    // if the movie has been created and we set its id
    if (createdId) {
      // redirect to the movies show page
      return <Redirect to={`/pictures/${createdId}`} />
    }
    return (
      <div className='row'>
        <div className='col-4 mx-auto mt-5'>
          <h3>Add Picture</h3>
          <PictureForm
            picture={picture}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </div>
      </div>
    )
  }
}

export default PictureCreate
