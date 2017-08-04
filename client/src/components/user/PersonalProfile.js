import React from 'react'
import fetch from 'isomorphic-fetch'
import Strings from '../../localization'
import {formatError} from './utils'
import {Button, Modal, Form, Message} from 'semantic-ui-react'

class RegistrationModal extends React.Component {
  constructor(props) {
    super(props)
    this.resetState()
    this.fields = ['fatherName', 'birthDate', 'birthPlace', 'nationalId', 'mobileNumber', 'maritalStatus',
      'landlineNumber', 'address']
  }

  resetState() {
    this.state = {
      fatherName: {value: '', error: false},
      birthDate: {value: '', error: false},
      birthPlace: {value: '', error: false},
      nationalId: {value: '', error: false},
      mobileNumber: {value: '', error: false},
      maritalStatus: {value: false, error: false},
      landlineNumber: {value: '', error: false},
      address: {value: '', error: false},
    }
  }

  onFatherNameChanged(value) {
    this.setState({fatherName: {value, error: value.length < 3}})
  }

  onBirthDateChanged(value) {
    this.setState({birthDate: {value, error: !/\d{4}\/\d{1,2}\/\d{1,2}/.test(value)}})
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
    this.onEmailChanged(this.state.email.value)
    this.onPasswordChanged(this.state.password.value)
    this.onConfirmPasswordChanged(this.state.confirmPassword.value)
    this.onFirstNameChanged(this.state.firstName.value)
    this.onLastNameChanged(this.state.lastName.value)
  }

  generateErrors() {
    let errors = this.state.error
    if (this.state.studentId.error) {
      errors += formatError(Strings.studentIdError)
    }
    if (this.state.email.error) {
      errors += formatError(Strings.emailError)
    }
    if (this.state.password.error) {
      errors += formatError(Strings.passwordError)
    }
    if (this.state.confirmPassword.error) {
      errors += formatError(Strings.confirmPasswordError)
    }
    if (this.state.firstName.error || this.state.lastName.error) {
      errors += formatError(Strings.nameError)
    }
    if (this.state.rules.error) {
      errors += formatError(Strings.rulesError)
    }
    return errors
  }

  register() {
    if (this.isOK()) {
      fetch('/api/user/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.studentId.value,
          email: this.state.email.value,
          password: this.state.password.value,
          first_name: this.state.firstName.value,
          last_name: this.state.lastName.value,
        }),
      })
        .then(response => response.json())
        .then(result => this.handleResult(result))
    } else this.validate()
  }

  handleResult(result) {
    if (result.id) {
      this.setState({done: true})
    } else if (result.username) {
      this.setState({error: formatError(Strings.studentIdAlreadyExists)})
    }
  }

  render() {
    const errors = this.generateErrors()
    return (
      <div>
        <Form>
          <Form.Group widths='equal'>
            <Form.Input
              label={Strings.studentId}
              value={this.state.studentId.value}
              error={this.state.studentId.error}
              onChange={event => this.onStudentIdChanged(event.target.value)}
              placeholder={Strings.studentId}
            />
            <Form.Input
              label={Strings.email}
              value={this.state.email.value}
              error={this.state.email.error}
              onChange={event => this.onEmailChanged(event.target.value)}
              placeholder={Strings.email}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input
              label={Strings.firstName}
              value={this.state.firstName.value}
              error={this.state.firstName.error}
              onChange={event => this.onFirstNameChanged(event.target.value)}
              placeholder={Strings.firstName}
            />
            <Form.Input
              label={Strings.lastName}
              value={this.state.lastName.value}
              error={this.state.lastName.error}
              onChange={event => this.onLastNameChanged(event.target.value)}
              placeholder={Strings.lastName}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input
              label={Strings.password}
              value={this.state.password.value}
              error={this.state.password.error}
              onChange={event => this.onPasswordChanged(event.target.value)}
              placeholder={Strings.password}
              type='password'
            />
            <Form.Input
              label={Strings.confirmPassword}
              value={this.state.confirmPassword.value}
              error={this.state.confirmPassword.error}
              onChange={event => this.onConfirmPasswordChanged(event.target.value)}
              placeholder={Strings.confirmPassword}
              type='password'
            />
          </Form.Group>
          <Form.Checkbox
            label={Strings.iAgreeWithRules}
            checked={this.state.rules.value}
            error={this.state.rules.error}
            onClick={() => this.onRulesChanged()}
          />
        </Form>
        <Button primary onClick={() => this.register()}>{Strings.registration}</Button>
        <Button secondary onClick={() => this.close()}>{Strings.cancel}</Button>
      </div>
    )
  }
}

export default RegistrationModal
