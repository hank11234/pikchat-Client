import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
// import { Link } from 'react-router-dom'
import { pictureIndexAll } from '../../api/pictures'
import '../../index.scss'

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
    // make a request to get all of our movies
    pictureIndexAll()
      // set the movies state, to the movies we got back in the response's data
      .then(res => this.setState({ pictures: res.data.pictures }))
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
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      )
    }
    if (pictures.length === 0) {
      return (
        <div>
          <h2 className='text-center'>There are no pictures. Go take some!</h2>
        </div>
      )
    }

    let picturesJsx
    if (this.props.user === null) {
      picturesJsx = pictures.map(picture => (
        <Card key={picture.id} className='col-3 ' style={{ margin: '5px', display: 'inline-flex', backgroundColor: '#dbdbdb' }}>
          <Card.Link href={'#sign-in/'}>
            <Card.Body>
              <div>
                <Card.Img src={picture.picture}/>
              </div>
              <Card.Title style={{ color: '#000000' }}>{picture.title}</Card.Title>
              <Card.Text style={{ color: '#000000' }}>Submitted by: {picture.owner}</Card.Text>
            </Card.Body>
          </Card.Link>
        </Card>
      ))
    } else {
      picturesJsx = pictures.map(picture => (
        <Card key={picture.id} className='col-3 index-card' style={{ margin: '5px', display: 'inline-flex', backgroundColor: '#dbdbdb' }}>
          <Card.Link href={`#pictures/${picture.id}`}>
            <Card.Body>
              <div>
                <Card.Img src={picture.picture}/>
              </div>
              <Card.Title style={{ color: '#000000' }}>{picture.title}</Card.Title>
              <Card.Text style={{ color: '#000000' }}>Submitted by: {picture.owner}</Card.Text>
            </Card.Body>
          </Card.Link>
        </Card>
      ))
    }

    return (
      <div className='container-fluid pictureContainer'>
        <div className='mt-1'>
          <h3 className='text-center'>Pictures</h3>
          <div className='row' style={{ justifyContent: 'center' }}>{picturesJsx.reverse()}</div>
        </div>
      </div>
    )
  }
}

export default PictureIndexAll
