import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
import PictureCreate from './components/Pictures/PictureCreate'
import PictureEdit from './components/Pictures/PictureEdit'
import PictureIndex from './components/Pictures/PictureIndex'
import PictureIndexAll from './components/Pictures/PictureIndexAll'
import PictureShow from './components/Pictures/PictureShow'
import CommentIndex from './components/Comments/CommentIndex'
import CommentCreate from './components/Comments/CommentCreate'
import CommentEdit from './components/Comments/CommentEdit'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container-fluid" style={{ padding: 0 }}>
          <Route path='/sign-up/' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in/' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out/' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password/' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/create-picture/' render={() => (
            <PictureCreate msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/edit-picture/:id' render={() => (
            <PictureEdit msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/my-pictures/' render={() => (
            <PictureIndex msgAlert={this.msgAlert} user={user} />
          )} />
          <Route user={user} exact path='/' render={() => (
            <PictureIndexAll msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/pictures/:id' render={() => (
            <PictureShow msgAlert={this.msgAlert} user={user} />
          )} />
          <Route user={user} path='/pictures/:id' render={({ match }) => (
            <CommentIndex msgAlert={this.msgAlert} user={user} match={match} />
          )} />
          <AuthenticatedRoute user={user} path='/pictures/:id' render={({ match }) => (
            <CommentCreate msgAlert={this.msgAlert} user={user} match={match} />
          )} />
          <AuthenticatedRoute user={user} path='/edit-comment/:id' render={({ match }) => (
            <CommentEdit msgAlert={this.msgAlert} user={user} match={match} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
