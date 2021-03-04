import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { pictureIndex } from '../../api/pictures'

class PictureIndex extends Component {
  constructor (props) {
    super(props)
    // keep track of the pictures in our application
    // initially they will be null until we have fetched them from the api
    this.state = {
      pictures: null
    }
  }

  // after we render the PictureIndex component for the first time
  componentDidMount () {
    const { msgAlert, user } = this.props
    // make a request to get all of our pictures
    pictureIndex(user)
      // set the pictures state, to the pictures we got back in the response's data
      .then(res => this.setState({ pictures: res.data.pictures }))
      // dummy data until we create actual pictures
      // .then(res => this.setState({ pictures: [{ id: 1, title: 'jaws' }, { id: 2, title: 'The Phantom Menace' }] }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to load your pictures!',
          message: 'Could not load pictures with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    // destructure our pictures state
    const { pictures } = this.state
    console.log(pictures)
    // if we haven't fetched any pictures yet from the API
    if (!pictures || pictures.length === 0) {
      // A Spinner is just a nice loading message we get from react bootstrap
      return (
        <div>
          <h2>There are no pictures! Go take some!</h2>
        </div>
      )
    }

    const picturesJsx = pictures.map(picture => (
      <Link to={`/pictures/${picture.id}`} key={picture.id}>
        <li>
          {picture.title}
        </li>
      </Link>
    ))

    return (
      <div className='col-4 mx-auto mt-1'>
        <h3 className='text-center'>My Pictures</h3>
        <ul>
          {picturesJsx}
        </ul>
      </div>
    )
  }
}

export default PictureIndex
