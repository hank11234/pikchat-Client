import React, { Component } from 'react'
import CommentForm from './CommentForm'
// import { Redirect } from 'react-router-dom'
import { commentCreate } from '../../api/comments'
import Card from 'react-bootstrap/Card'

class CommentCreate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      comment: {
        comment: '',
        pictureId: parseInt(this.props.match.params.id)
      },
      createdId: null,
      deleted: false
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const { user, msgAlert } = this.props
    const { comment, pictureId } = this.state
    console.log(this.state)
    // create a movie, pass it the movie data and the user for its token
    commentCreate(comment, user, pictureId)
      // set the createdId to the id of the movie we just created
      // .then(res => this.setState({ createdId: res.data.movie.id }))
      .then(res => {
        this.setState({ createdId: res.data.comment.id })
        // this.setState({ pictureId: match.params.id })
        console.log(this.state)
        console.log(res)
        // pass the response to the next .then so we can show the title
        return res
      })
      .then(res => msgAlert({
        heading: 'Added new comment successfully',
        message: 'Comment has been added successfully. Now viewing comments.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to add comment',
          message: 'Could not add comment with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

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
        comment: { ...state.comment, [event.target.name]: event.target.value }
      }
    })
  }

  render () {
    // destructure our movie and createdId state
    const { comment, createdId } = this.state
    // if the movie has been created and we set its id
    if (createdId) {
      // redirect to the movies show page
      return (
        <div>
          <h5>Comment: {comment.comment} <br/> Added!</h5>
        </div>
      )
    } else {
      return (
        <Card style={{ display: 'inline-flex', padding: '30px 30px 0 30px', marginLeft: '5px', marginBottom: '5px' }}>
          <Card.Title style={{ paddingLeft: '6px' }}>Add Comment</Card.Title>
          <CommentForm
            comment={comment}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </Card>
      )
    }
  }
}

export default CommentCreate
