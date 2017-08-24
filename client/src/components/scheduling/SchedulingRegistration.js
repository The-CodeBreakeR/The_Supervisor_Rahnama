import React from 'react'
import fetch from 'isomorphic-fetch'
import Strings from '../../localization'
import { formatError } from './utils'
import { Button, Modal, Form, Message } from 'semantic-ui-react'

class SchedulingRegistration extends React.Component {
  constructor(props) {
    super(props)
    this.resetState()
    this.fields = ['name', 'startDate', 'endDate', 'type']
  }

  resetState() {
    this.state = {
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
    return true
  }

  onEndDateChanged() {
    return true
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
      fetch('/newScheduling/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name.value,
          type: this.state.type.value,
          startDate: this.state.startDate.value,
          endDate: this.state.endDate.value,
        }),
      })
        .then(response => response.json())
        .then(result => this.handleResult(result))
    } else this.validate()
  }

  handleResult(result) {
    if (result.id) {
      this.setState({ done: true })
    } else if (result.name) {
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
              <Form.Group widths='equal'>
                <Form.Input
                  label={Strings.firstName}
                  value={this.state.nameame.value}
                  error={this.state.name.error}
                  onChange={event => this.onNameChanged(event.target.value)}
                  placeholder={Strings.name}
                />
                <Form.Input
                  label={Strings.firstName}
                  value={this.state.type.value}
                  error={this.state.type.error}
                  onChange={event => this.onTypeChanged(event.target.value)}
                  placeholder={Strings.lastName}
                />
              </Form.Group>
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
export default SchedulingRegistration
