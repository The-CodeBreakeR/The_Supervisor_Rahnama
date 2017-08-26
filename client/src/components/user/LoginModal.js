import React from 'react'
import fetch from 'isomorphic-fetch'
import Cookie from 'browser-cookies'
import Strings from '../../localization'
import { formatError } from './utils'
import { Button, Modal, Form, Message } from 'semantic-ui-react'

class LoginModal extends React.Component {
  constructor(props) {
    super(props)
    this.resetState()
    this.fields = ['studentId', 'password']
  }

  resetState() {
    this.state = {
      studentId: { value: '', error: false },
      password: { value: '', error: false },
      open: false,
      error: '',
    }
  }

  close() {
    this.setState({ open: false })
    this.resetState()
  }

  onStudentIdChanged(value) {
    this.setState({ studentId: { value, error: !/^[0-9]+$/.test(value) || value.length < 8 } })
  }

  onPasswordChanged(value) {
    this.setState({ password: { value, error: value.length < 6 } })
  }

  isOK() {
    for (const field of this.fields) {
      if (!this.state[field].value || this.state[field].error) {
        return false
      }
    }
    return true
  }

  validate() {
    this.onStudentIdChanged(this.state.studentId.value)
    this.onPasswordChanged(this.state.password.value)
  }

  generateErrors() {
    let errors = this.state.error
    if (this.state.studentId.error) {
      errors += formatError(Strings.studentIdError)
    }
    if (this.state.password.error) {
      errors += formatError(Strings.passwordError)
    }
    return errors
  }

  login() {
    if (this.isOK()) {
      fetch('/api-token-auth/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.studentId.value,
          password: this.state.password.value,
        }),
      })
        .then(response => response.json())
        .then(result => this.handleResult(result))
    } else this.validate()
  }

  handleResult(result) {
    if (result.token) {
      Cookie.set('token', result.token)
      localStorage.setItem('user', JSON.stringify(result))
      this.close()
      this.props.onLogin && this.props.onLogin()
    } else {
      this.setState({ error: formatError(Strings.wrongStudentIdOrPassword) })
    }
  }

  render() {
    const errors = this.generateErrors()
    return (
      <Modal
        trigger={<Button primary>{Strings.login}</Button>}
        open={this.state.open}
        onOpen={() => this.setState({ open: true })}
        onClose={() => this.close()}
      >
        <Modal.Header>{Strings.loginToSystem}</Modal.Header>
        <Modal.Content>
          <Form className='profile-form'>
            <Form.Input
              label={Strings.studentId}
              value={this.state.studentId.value}
              error={this.state.studentId.error}
              onChange={event => this.onStudentIdChanged(event.target.value)}
              placeholder='93000000'
            />
            <Form.Input
              label={Strings.password}
              value={this.state.password.value}
              error={this.state.password.error}
              onChange={event => this.onPasswordChanged(event.target.value)}
              placeholder={Strings.password}
              type='password'
            />
          </Form>
          {errors && <Message
            error
            content={errors}
          />
          }
        </Modal.Content>
        <Modal.Actions>
          <Button secondary onClick={() => this.close()}>{Strings.back}</Button>
          <Button primary onClick={() => this.login()}>{Strings.login}</Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default LoginModal
