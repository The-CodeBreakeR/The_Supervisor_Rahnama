import React from 'react'
import fetch from 'isomorphic-fetch'
import { Button, Modal, Form, Message } from 'semantic-ui-react'

class RegistrationModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      studentId: { value: '', error: false },
      password: { value: '', error: false },
      confirmPassword: { value: '', error: false },
      rules: { value: false, error: true },
      open: false,
      error: '',
    }
    this.fields = ['studentId', 'password', 'confirmPassword', 'rules']
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
    this.onConfirmPasswordChanged(this.state.confirmPassword.value)
  }

  generateErrors() {
    let errors = this.state.error
    if (this.state.studentId.error) {
      errors += '\u2219 شماره‌ی دانشجویی باید متشکل از ارقام باشد و حداقل ۸ کاراکتر باشد.\n'
    }
    if (this.state.password.error) {
      errors += '\u2219 رمز عبور باید حداقل ۶ کاراکتر باشد.\n'
    }
    if (this.state.confirmPassword.error) {
      errors += '\u2219 تکرار رمز عبور صحیح نیست.\n'
    }
    if (this.state.rules.error) {
      errors += '\u2219 برای عضویت در سیستم شما باید قوانین را قبول کنید.\n'
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
        }),
      })
        .then(response => response.json())
        .then(result => this.handleResult(result))
    } else this.validate()
  }

  handleResult(result) {
    if (result.id) {
      this.setState({ open: false })
    } else if (result.username) {
      this.setState({ error: '\u2219 کاربری با این شماره‌ی دانشجویی از قبل وجود دارد.\n' })
    }
  }

  render() {
    const errors = this.generateErrors()
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
          {errors && <Message
            error
            content={errors}
            />
          }
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
