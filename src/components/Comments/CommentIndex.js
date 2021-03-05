import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { commentIndex } from '../../api/comments'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class CommentIndex extends Component {
  constructor (props) {
    super(props)
    // keep track of the pictures in our application
    // initially they will be null until we have fetched them from the api
    this.state = {
      comments: [],
      deleted: false
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

  deleteSuccess = () => {
    const { user } = this.props
    commentIndex(user)
      .then(res => this.setState({ comments: res.data.comments }))
    console.log('this worked')
  }

  deleteComment = (event) => {
    const { user, msgAlert } = this.props
    const commentId = event.target.id
    axios({
      url: `${apiUrl}/comments/${commentId}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(() => {
        this.deleteSuccess()
      })
      .then(() => msgAlert({
        heading: 'Comment deleted successfully',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to delete comment!',
          message: 'Could not delete comment with error: ' + error.message,
          variant: 'danger'
        })
      })
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
      if (comment.pictureId.toString() === match.params.id) {
        if (comment.owner === this.props.user.id) {
          return (
            <div key={comment.id} style={{ borderTop: '1px solid #000000', marginRight: '40px' }}>
              <p>{comment.comment}</p>
              <button onClick={this.deleteComment} id={comment.id}>Delete Comment</button> <button><Link to={{
                pathname: `/edit-comment/${comment.id}`,
                state: {
                  comment: comment.comment
                }
              }}>Edit Comment</Link></button>
              {comment.deleted ? this.deleteSuccess() : commentsJsx}
            </div>
          )
        } else {
          return (
            <p style={{ borderTop: '1px solid #000000', marginRight: '40px' }}>{comment.comment}</p>
          )
        }
      }
    })

    return (
      <div>
        <h3 style={{ paddingLeft: '40px' }}>Comments</h3>
        <ul>
          {commentsJsx}
        </ul>
      </div>
    )
  }
}

export default CommentIndex
