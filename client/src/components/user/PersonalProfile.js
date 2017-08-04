import React from 'react'
import fetch from 'isomorphic-fetch'
import Strings from '../../localization'
import {formatError, getUser} from './utils'
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
      maritalStatus: {value: '', error: false},
      landlineNumber: {value: '', error: false},
      address: {value: '', error: false},
      error: '',
    }
  }

  onFatherNameChanged(value) {
    this.setState({fatherName: {value, error: value.length < 3}})
  }

  onBirthDateChanged(value) {
    this.setState({birthDate: {value, error: !/\d{4}\/\d{1,2}\/\d{1,2}/.test(value)}})
  }

  onBirthPlaceChanged(value) {
    this.setState({birthPlace: {value, error: value.length < 3}})
  }

  onNationalIdChanged(value) {
    this.setState({nationalId: {value, error: !/\d{10}/.test(value)}})
  }

  onMobileNumberChanged(value) {
    this.setState({mobileNumber: {value, error: !/^(\+|0|98|\+98|0098)?9\d{9}$/.test(value)}})
  }

  onLandlineNumberChanged(value) {
    this.setState({landlineNumber: {value, error: !/^(\+|0|98|\+98|0098)?\d{10}$/.test(value)}})
  }

  onMaritalStatusChanged(value) {
    this.setState({maritalStatus: {value, error: value !== 'S' && value !== 'M'}})
  }

  onAddressChanged(value) {
    this.setState({address: {value, error: value.length < 10}})
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
    this.onFatherNameChanged(this.state.fatherName.value)
    this.onBirthDateChanged(this.state.birthDate.value)
    this.onBirthPlaceChanged(this.state.birthPlace.value)
    this.onNationalIdChanged(this.state.nationalId.value)
    this.onMobileNumberChanged(this.state.mobileNumber.value)
    this.onLandlineNumberChanged(this.state.landlineNumber.value)
    this.onMaritalStatusChanged(this.state.maritalStatus.value)
    this.onAddressChanged(this.state.address.value)
  }

  generateErrors() {
    let errors = this.state.error
    if (this.state.fatherName.error) {
      errors += formatError(Strings.fatherNameError)
    }
    if (this.state.birthDate.error) {
      errors += formatError(Strings.birthDateError)
    }
    if (this.state.birthPlace.error) {
      errors += formatError(Strings.birthPlaceError)
    }
    if (this.state.nationalId.error) {
      errors += formatError(Strings.nationalIdError)
    }
    if (this.state.mobileNumber.error) {
      errors += formatError(Strings.mobileNumberError)
    }
    if (this.state.landlineNumber.error) {
      errors += formatError(Strings.landlineNumberError)
    }
    if (this.state.maritalStatus.error) {
      errors += formatError(Strings.maritalStatusError)
    }
    if (this.state.address.error) {
      errors += formatError(Strings.addressError)
    }
    return errors
  }

  submit() {
    if (this.isOK()) {
      fetch('/api/personal_profile/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: `/api/user/${getUser().id}/`,
          fatherName: this.state.fatherName.value,
          birthDate: this.state.birthDate.value,
          birthPlace: this.state.birthPlace.value,
          nationalId: this.state.nationalId.value,
          mobileNumber: this.state.mobileNumber.value,
          landlineNumber: this.state.landlineNumber.value,
          maritalStatus: this.state.maritalStatus.value,
          address: this.state.address.value,
        }),
      })
        .then(response => response.json())
        .then(result => this.handleResult(result))
    } else this.validate()
  }

  handleResult(result) {
    if (result.url) {
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
              label={Strings.fatherName}
              value={this.state.fatherName.value}
              error={this.state.fatherName.error}
              onChange={event => this.onFatherNameChanged(event.target.value)}
              placeholder={Strings.fatherName}
            />
            <Form.Input
              label={Strings.nationalId}
              value={this.state.nationalId.value}
              error={this.state.nationalId.error}
              onChange={event => this.onNationalIdChanged(event.target.value)}
              placeholder={Strings.nationalId}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input
              label={Strings.birthDate}
              value={this.state.birthDate.value}
              error={this.state.birthDate.error}
              onChange={event => this.onBirthDateChanged(event.target.value)}
              placeholder={Strings.birthDate}
            />
            <Form.Input
              label={Strings.birthPlace}
              value={this.state.birthPlace.value}
              error={this.state.birthPlace.error}
              onChange={event => this.onBirthPlaceChanged(event.target.value)}
              placeholder={Strings.birthPlace}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input
              label={Strings.mobileNumber}
              value={this.state.mobileNumber.value}
              error={this.state.mobileNumber.error}
              onChange={event => this.onMobileNumberChanged(event.target.value)}
              placeholder={Strings.mobileNumber}
              type='password'
            />
            <Form.Input
              label={Strings.landlineNumber}
              value={this.state.landlineNumber.value}
              error={this.state.landlineNumber.error}
              onChange={event => this.onLandlineNumberChanged(event.target.value)}
              placeholder={Strings.landlineNumber}
              type='password'
            />
          </Form.Group>
          <Form.Select
            label={Strings.maritalStatus}
            placeholder={Strings.maritalStatus}
            value={this.state.maritalStatus.value}
            error={this.state.maritalStatus.error}
            options={[{key: 'S', value: 'S', text: Strings.single}, {key: 'M', value: 'M', text: Strings.married}]}
            onChange={(_, obj) => this.onMaritalStatusChanged(obj.value)}
          />
          <Form.TextArea
            label={Strings.address}
            value={this.state.address.value}
            error={this.state.address.error}
            onChange={event => this.onAddressChanged(event.target.value)}
            placeholder={Strings.address}
          />
        </Form>
        {errors && <Message
            error
            content={errors}
          />
        }
        <div className="personal-profile__submit">
          <Button primary onClick={() => this.submit()}>{Strings.submit}</Button>
        </div>
      </div>
    )
  }
}

export default RegistrationModal
