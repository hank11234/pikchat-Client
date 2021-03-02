import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import './Comments.scss'

class EditComment extends Component {
  constructor (props) {
    super(props)

    this.state = {
      comment: {
        comment: this.props.location.state.comment
      },
      edited: false
    }
  }

  async componentDidMount () {
    try {
      console.log(this.props)
      console.log(this.state)
      const res = await axios(`${apiUrl}/comments/${this.props.match.params.id}`)
      console.log(res)
      this.setState({ comment: res.data.comment })
    } catch (err) {
      console.error(err)
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { user, match, msgAlert } = this.props
    axios({
      method: 'PATCH',
      url: `${apiUrl}/comments/${match.params.id}/`,
      headers: {
        'Authorization': `Token ${user.token}`
      },
      data: { comment: this.state.comment }
    })
      .then(() => {
        this.setState({ edited: true })
      })
      .then(() => msgAlert({
        heading: 'Comment Edited Successfully',
        message: 'Now viewing pictures.',
        variant: 'success'
      }))
      .catch(console.error)
  }

  handleInputChange = (event) => {
    event.persist()
    this.setState(currState => {
      const editedField = {
        [event.target.name]: event.target.value
      }
      const newComment = { ...currState.comment, ...editedField }
      return { comment: newComment }
    })
  }

  render () {
    if (this.state.edited) {
      console.log(this.state)
      return <Redirect to={'/'}/>
    }
    return (
      <main>
        <h2>Edit Comment</h2>
        <form onSubmit={this.handleSubmit}>
          <textarea
            name="comment"
            rows="8"
            cols="60"
            placeholder='Enter new Comment'
            value={this.state.comment.comment}
            onChange={this.handleInputChange}
          />
          <button type="submit" className='commentSubmit'>Submit</button>
        </form>
      </main>
    )
  }
}

export default withRouter(EditComment)
