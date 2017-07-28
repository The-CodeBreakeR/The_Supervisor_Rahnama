import React from 'react'
import fetch from 'isomorphic-fetch'
import { Button, Modal, Checkbox, Form} from 'semantic-ui-react'

class RegistrationModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      studentId: { value: '', error: false },
      password: { value: '', error: false },
      confirmPassword: { value: '', error: false },
      rules: { value: false, error: true },
      open: false,
    }
  }

  onStudentIdChanged(value) {
    this.setState({ studentId: { value, error: !/^[0-9]+$/.test(value) || value.length < 8 } })
  }

  onPasswordChanged(value) {
    this.setState({ password: { value, error: value.length < 6 } })
    this.setState({ confirmPassword: { value: this.state.confirmPassword.value, error: value !== this.state.confirmPassword.value } })
  }

  onConfirmPasswordChanged(value) {
    this.setState({ confirmPassword: { value, error: value !== this.state.password.value } })
  }

  onRulesChanged() {
    this.setState({ rules: { value: !this.state.rules.value, error: !this.state.rules.error } })
  }

  isOK() {
    const fields = ['studentId', 'password', 'confirmPassword', 'rules']
    for (const field of fields) {
      if (!this.state[field].value || this.state[field].error) {
        return false
      }
    }
    return true
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
        }),
      })
        .then(response => response.json())
        .then(result => this.handleResult(result))
    }
  }

  handleResult(result) {
    if (result.id) {
      this.setState({ open: false })
    }
  }

  render() {
    return (
      <Modal
        trigger={<Button>ثبت نام</Button>}
        open={this.state.open}
        onOpen={() => this.setState({ open: true })}
        onClose={() => this.setState({ open: false })}
      >
        <Modal.Header>ثبت نام</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              label='شماره‌ی دانشجویی'
              value={this.state.studentId.value}
              error={this.state.studentId.error}
              onChange={event => this.onStudentIdChanged(event.target.value)}
              placeholder='شماره‌ی دانشجویی'
            />
            <Form.Input
              label='رمز عبور'
              value={this.state.password.value}
              error={this.state.password.error}
              onChange={event => this.onPasswordChanged(event.target.value)}
              placeholder='رمز عبور'
              type='password'
            />
            <Form.Input
              label='تکرار رمز عبور'
              value={this.state.confirmPassword.value}
              error={this.state.confirmPassword.error}
              onChange={event => this.onConfirmPasswordChanged(event.target.value)}
              placeholder='تکرار رمز عبور'
              type='password'
            />
            <Form.Checkbox
              label='با قوانین موافقم'
              checked={this.state.rules.value}
              error={this.state.rules.error}
              onClick={() => this.onRulesChanged()}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={() => this.register()}>عضویت</Button>
          <Button secondary onClick={() => this.setState({ open: false })}>انصراف</Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default RegistrationModal
