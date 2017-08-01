import React from 'react'
import fetch from 'isomorphic-fetch'
import Strings from '../../localization'
import { formatError } from './utils'
import { Button, Modal, Form, Message } from 'semantic-ui-react'

class RegistrationModal extends React.Component {
  constructor(props) {
    super(props)
    this.resetState()
    this.fields = ['name', 'startDate', 'endDate', 'type']
  }

  resetState() {
    this.state = {
      // studentId: { value: '', error: false },
      // password: { value: '', error: false },
      // confirmPassword: { value: '', error: false },
      // firstName: { value: '', error: false },
      // lastName: { value: '', error: false },
      // rules: { value: false, error: true },
      name: { value: '', error: false },
      startDate: { value: '', error: false },
      endDate: { value: '', error: false },
      type: { value: '', error: false },
      open: false,
      done: false,
      error: '',
    }
  }

  close() {
    this.setState({ open: false })
    this.resetState()
  }

  onNameChanged(value) {
    this.setState({ name: { value, error: value.length < 3 } })
  }

  onTypeChanged(value) {
    this.setState({ lastName: { value, error: value.length < 3 } })
  }

  onStartDateChanged() {
    //  this.setState({ rules: { value: !this.state.rules.value, error: !this.state.rules.error } })
  }

  onEndDateChanged() {
    //  this.setState({ rules: { value: !this.state.rules.value, error: !this.state.rules.error } })
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
    //  this.onConfirmPasswordChanged(this.state.confirmPassword.value)

    this.onNameChanged(this.state.name.value)
    this.onTypeChanged(this.state.type.value)
    this.onStartDateChanged(this.state.startDate.value)
    this.onEndDateChanged(this.state.endDate.value)
  }

  generateErrors() {
    let errors = this.state.error
    if (this.state.studentId.error) {
      errors += formatError(Strings.studentIdError)
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
      this.setState({ done: true })
    } else if (result.username) {
      this.setState({ error: formatError(Strings.studentIdAlreadyExists) })
    }
  }

  render() {
    const errors = this.generateErrors()
    return (
      <Modal
        trigger={<Button>{Strings.schedulingNewItem}</Button>}
        open={this.state.open}
        onOpen={() => this.setState({ open: true })}
        onClose={() => this.close()}
        closeIcon
      >
        <Modal.Header>{Strings.registration}</Modal.Header>
        {!this.state.done
          ? <Modal.Content>
            <Form>
              <Form.Input
                label={Strings.studentId}
                value={this.state.studentId.value}
                error={this.state.studentId.error}
                onChange={event => this.onStudentIdChanged(event.target.value)}
                placeholder={Strings.studentId}
              />
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
            {errors && <Message
              error
              content={errors}
            />
            }
          </Modal.Content>
          : <Modal.Content>
            {Strings.successfullyRegistered}
          </Modal.Content>
        }
        {!this.state.done
          ? <Modal.Actions>
            <Button primary onClick={() => this.register()}>{Strings.registration}</Button>
            <Button secondary onClick={() => this.close()}>{Strings.cancel}</Button>
          </Modal.Actions>
          : <Modal.Actions>
            <Button primary onClick={() => this.close()}>{Strings.finish}</Button>
          </Modal.Actions>
        }
      </Modal>
    )
  }
}

export default RegistrationModal
