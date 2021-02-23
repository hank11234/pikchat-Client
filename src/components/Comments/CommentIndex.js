import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { commentIndex } from '../../api/comments'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class CommentIndex extends Component {
  constructor (props) {
    super(props)
    // keep track of the pictures in our application
    // initially they will be null until we have fetched them from the api
    this.state = {
      comments: []
    }
  }

  // after we render the PictureIndex component for the first time
  componentDidMount () {
    const { msgAlert, user } = this.props
    // make a request to get all of our pictures
    commentIndex(user)
      // set the pictures state, to the pictures we got back in the response's data
      .then(res => this.setState({ comments: res.data.comments }))
      // dummy data until we create actual pictures
      // .then(res => this.setState({ pictures: [{ id: 1, title: 'jaws' }, { id: 2, title: 'The Phantom Menace' }] }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to load your comments!',
          message: 'Could not load comments with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  deleteComment = () => {
    const { user, match } = this.props
    console.log(this.props)
    axios({
      url: `${apiUrl}/comments/${match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(() => {
        commentIndex(user)
      })
      .catch(console.error)
  }

  render () {
    // destructure our pictures state
    const { match } = this.props
    const { comments } = this.state
    console.log(comments)
    console.log(match)
    // if we haven't fetched any pictures yet from the API
    if (!comments || comments.length === 0) {
      return (
        <div>
          <h2>No comments yet!</h2>
        </div>
      )
    }

    const commentsJsx = comments.map(comment => {
      if (comment.picture_id.toString() === match.params.id) {
        if (comment.owner === this.props.user.id) {
          return (
            <div key={comment.id}>
              <p>{comment.comment}</p>
              <button onClick={this.deleteComment}>Delete Comment</button> <button><Link to={`/edit-comment/${comment.id}`}>Edit Comment</Link></button>
              {comment.deleted ? <Redirect to={`/picture/${this.state.comment.picture_id}`}/> : commentsJsx}
            </div>
          )
        } else {
          return (
            <p>{comment.comment}</p>
          )
        }
      }
    })

    return (
      <div>
        <h3>Comments</h3>
        <ul>
          {commentsJsx}
        </ul>
      </div>
    )
  }
}

export default CommentIndex
