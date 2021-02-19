import React, { Component } from 'react'
import { withRouter, Redirect, Link } from 'react-router-dom'
import { pictureShow } from '../../api/pictures'
import apiUrl from '../../apiConfig'
import axios from 'axios'

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
      .then(res => this.setState({ picture: res.data }))
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
        'Authorization': `Bearer ${user.token}`
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
      return <Redirect to="/pictures/"/>
    }
    if (!picture) {
      return (
        <div>
          <h2>There are no pictures! Go make one.</h2>
        </div>
      )
    }

    return (
      <div>
        <h3>{picture.title}</h3>
        <img src={picture.picture} />
        <h3>{picture.description}</h3>
        <button onClick={this.deletePicture}>Delete Picture</button> <button><Link to={`/edit-picture/${picture.id}`}>Edit Picture</Link></button>
        {deleted ? <Redirect to="/pictures/"/> : pictureJsx}
      </div>
    )
  }
}

export default withRouter(PictureShow)
