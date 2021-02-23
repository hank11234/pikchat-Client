import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class EditComment extends Component {
  constructor (props) {
    super(props)

    this.state = {
      comment: {
        comment: ''
      },
      edited: false
    }
  }

  async componentDidMount () {
    try {
      const res = await axios(`${apiUrl}/comments/${this.props.match.params.id}`)
      this.setState({ comment: res.data.comment })
    } catch (err) {
      console.error(err)
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { user, match } = this.props
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
      return <Redirect to={`/pictures/${this.state.comment.picture_id}`}/>
    }
    return (
      <main>
        <h2>Edit Comment</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            name="comment"
            type="text"
            placeholder="Enter new Comment"
            value={this.state.comment.comment}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
      </main>
    )
  }
}

export default withRouter(EditComment)
