import React, { Component } from 'react'
import { withRouter, Redirect, Link } from 'react-router-dom'
import { pictureShow } from '../../api/pictures'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

class PictureShow extends Component {
  constructor (props) {
    super(props)

    this.state = {
      picture: null,
      deleted: false
    }
  }

  componentDidMount () {
    const { user, match, msgAlert } = this.props
    console.log(this.props)
    pictureShow(match.params.id, user)
      .then(res => {
        this.setState({ picture: res.data })
      })
      .then(() => msgAlert({
        heading: 'Showing picture successfully',
        message: 'The picture is now displayed.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Showing picture failed',
          message: 'Failed to show picture with error: ' + error.message
        })
      })
  }

  deletePicture = () => {
    const { user, match } = this.props
    console.log(this.props)
    axios({
      url: `${apiUrl}/pictures/${match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(() => {
        this.setState({ deleted: true })
      })
      .catch(console.error)
  }

  render () {
    let pictureJsx
    // const { msgAlert, user } = this.props
    const { picture, deleted } = this.state
    if (deleted) {
      return <Redirect to="/"/>
    }
    if (!picture) {
      return (
        <div>
          <h2>There are no pictures! Go make one.</h2>
        </div>
      )
    }
    if (picture.owner === this.props.user.id) {
      return (
        <div style={{ backgroundColor: '#dbdbdb', paddingBottom: '10px' }}>
          <h1 className='text-center'>{picture.title}</h1>
          <img src={picture.picture} style={{ maxWidth: '100%', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}/>
          <h5 className='text-center'>{picture.description}</h5>
          <Button onClick={this.deletePicture} style={{ display: 'block', margin: 'auto', marginBottom: '10px' }} variant='dark'>Delete Picture</Button><Button style={{ display: 'block', margin: 'auto' }} variant='dark'><Link to={{
            pathname: `/edit-picture/${picture.id}`,
            state: {
              title: picture.title,
              picture: picture.picture,
              description: picture.description
            }
          }} style={{ color: '#ffffff' }}>Edit Picture</Link></Button>
          {deleted ? <Redirect to="/"/> : pictureJsx}
        </div>
      )
    } else {
      return (
        <div style={{ backgroundColor: '#dbdbdb', paddingBottom: '10px' }}>
          <h3>{picture.title}</h3>
          <img src={picture.picture} style={{ maxWidth: '100%' }} />
          <h5>{picture.description}</h5>
        </div>
      )
    }
  }
}

export default withRouter(PictureShow)
