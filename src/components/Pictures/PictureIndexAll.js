import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { pictureIndexAll } from '../../api/pictures'
import './PictureIndexAll.scss'

class PictureIndexAll extends Component {
  constructor (props) {
    super(props)
    // keep track of the movies in our application
    // initially they will be null until we have fetched them from the api
    this.state = {
      pictures: null
    }
  }

  // after we render the MovieIndex component for the first time
  componentDidMount () {
    const { msgAlert } = this.props
    console.log(this.props)
    // make a request to get all of our movies
    pictureIndexAll()
      // set the movies state, to the movies we got back in the response's data
      .then(res => {
        console.log(res)
        this.setState({ pictures: res.data.pictures })
      })
      // dummy data until we create actual movies
      // .then(res => this.setState({ movies: [{ id: 1, title: 'jaws' }, { id: 2, title: 'The Phantom Menace' }] }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to load pictures!',
          message: 'Could not load pictures with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    // destructure our movies state
    const { pictures } = this.state
    console.log(pictures)
    // if we haven't fetched any movies yet from the API
    if (!pictures) {
      // A Spinner is just a nice loading message we get from react bootstrap
      return (
        <div>
          <h2>There are no pictures! Go take some!</h2>
        </div>
      )
    }

    let picturesJsx
    if (this.props.user === null) {
      picturesJsx = pictures.map(picture => (
        <Link to={'/sign-in/'} key={picture.id} >
          <img src={picture.picture} className='indexAllPictures'/>
        </Link>
      ))
    } else {
      picturesJsx = pictures.map(picture => (
        <Link to={`/pictures/${picture.id}`} key={picture.id} >
          <img src={picture.picture} className='indexAllPictures'/>
        </Link>
      ))
    }

    return (
      <div>
        <h3>Pictures</h3>
        <ul>
          {picturesJsx}
        </ul>
      </div>
    )
  }
}

export default PictureIndexAll
