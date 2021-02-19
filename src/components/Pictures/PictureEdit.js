import React, { Component, Fragment } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class EditPicture extends Component {
  constructor (props) {
    super(props)

    this.state = {
      picture: {
        title: '',
        picture: '',
        description: ''
      },
      edited: false
    }
  }

  async componentDidMount () {
    try {
      const res = await axios(`${apiUrl}/pictures/${this.props.match.params.id}`)
      this.setState({ picture: res.data.picture })
    } catch (err) {
      console.error(err)
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { user, match } = this.props
    axios({
      method: 'PATCH',
      url: `${apiUrl}/pictures/${match.params.id}`,
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      data: { picture: this.state.picture }
    })
      .then(() => {
        console.log(this.state)
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
      const newPicture = { ...currState.picture, ...editedField }
      return { picture: newPicture }
    })
  }

  render () {
    if (this.state.edited) {
      return <Redirect to={`{/pictures/${this.props.match.params.id}}`}/>
    }
    return (
      <main>
        <Fragment>
          <h2>Edit Picture</h2>
          <form onSubmit={this.handleSubmit}>
            <input
              name="title"
              type="text"
              placeholder="Enter new Title"
              value={this.state.picture.title}
              onChange={this.handleInputChange}
            />
            <input
              name="picture"
              type="text"
              placeholder="Enter new Picture URL"
              value={this.state.picture.picture}
              onChange={this.handleInputChange}
            />
            <input
              name="description"
              type="text"
              placeholder="Enter new Description"
              value={this.state.picture.description}
              onChange={this.handleInputChange}
            />
            <button type="submit">Submit</button>
          </form>
        </Fragment>
      </main>
    )
  }
}

export default withRouter(EditPicture)
