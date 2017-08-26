import React from 'react'
import fetch from 'isomorphic-fetch'
import { Link } from 'react-router-dom'
import Strings from '../../localization'
import {formatError, getUser} from './utils'
import {Button, Header, Form, Message, Modal} from 'semantic-ui-react'

class PersonalProfile extends React.Component {
  constructor(props) {
    super(props)
    this.resetState()
    this.fields = ['fatherName', 'birthDate', 'birthPlace', 'nationalId', 'mobileNumber', 'gender',
      'landlineNumber', 'address']
  }

  componentWillMount() {
    fetch(`/api/user/${getUser().id}/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        const personal = result.personal_profile
        if (personal) {
          this.onFatherNameChanged(personal.father_name)
          this.onBirthDateChanged(personal.birth_date)
          this.onBirthPlaceChanged(personal.birth_place)
          this.onNationalIdChanged(personal.national_id)
          this.onMobileNumberChanged(personal.mobile_number)
          this.onLandlineNumberChanged(personal.land_line_number)
          this.onGenderChanged(personal.gender)
          this.onAddressChanged(personal.address)
          this.setState({ url: personal.url })
        }
      })
  }

  resetState() {
    this.state = {
      fatherName: {value: '', error: false},
      birthDate: {value: '', error: false},
      birthPlace: {value: '', error: false},
      nationalId: {value: '', error: false},
      mobileNumber: {value: '', error: false},
      gender: {value: '', error: false},
      landlineNumber: {value: '', error: false},
      address: {value: '', error: false},
      error: '',
      url: '',
      done: false,
    }
  }

  onFatherNameChanged(value) {
    this.setState({fatherName: {value, error: value.length < 3}})
  }

  onBirthDateChanged(value) {
    this.setState({birthDate: {value, error: !/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(value)}})
  }

  onBirthPlaceChanged(value) {
    this.setState({birthPlace: {value, error: value.length < 3}})
  }

  onNationalIdChanged(value) {
    this.setState({nationalId: {value, error: !/^\d{10}$/.test(value)}})
  }

  onMobileNumberChanged(value) {
    this.setState({mobileNumber: {value, error: !/^(\+|0|98|\+98|0098)?9\d{9}$/.test(value)}})
  }

  onLandlineNumberChanged(value) {
    this.setState({landlineNumber: {value, error: !/^(\+|0|98|\+98|0098)?\d{7,10}$/.test(value)}})
  }

  onGenderChanged(value) {
    this.setState({gender: {value, error: value !== 'S' && value !== 'M'}})
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
    this.onGenderChanged(this.state.gender.value)
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
    if (this.state.gender.error) {
      errors += formatError(Strings.genderError)
    }
    if (this.state.address.error) {
      errors += formatError(Strings.addressError)
    }
    return errors
  }

  submit() {
    if (this.isOK()) {
      fetch(this.state.url || '/api/personal_profile/', {
        method: this.state.url ? 'PATCH' : 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: `/api/user/${getUser().id}/`,
          father_name: this.state.fatherName.value,
          birth_date: this.state.birthDate.value,
          birth_place: this.state.birthPlace.value,
          national_id: this.state.nationalId.value,
          mobile_number: this.state.mobileNumber.value,
          land_line_number: this.state.landlineNumber.value,
          gender: this.state.gender.value,
          address: this.state.address.value,
        }),
      })
        .then(response => response.json())
        .then(result => this.handleResult(result))
    } else this.validate()
  }

  handleResult(result) {
    if (result.url) {
      this.props.updateProfile()
      this.setState({ url: result.url, done: true })
    }
  }

  render() {
    const errors = this.generateErrors()
    return (
      <div>
        <Modal
          open={this.state.done}
          onOpen={() => this.setState({ done: true })}
          onClose={() => this.setState({ done: false })}
        >
          <Modal.Header>{Strings.personalProfile}</Modal.Header>
          <Modal.Content>
            {Strings.profileSuccessfullySubmitted}`
          </Modal.Content>
          <Modal.Actions>
            <Button
              primary
              onClick={() => {
                this.setState({ done: false })
                this.props.history.push('/profile')
              }}
            >
              {Strings.finish}
            </Button>
          </Modal.Actions>
        </Modal>
        <Header>{Strings.personalProfile}</Header>
        <p>{Strings.personalProfileMessage}</p>
        <Form className='profile-form'>
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
              placeholder='0010000000'
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input
              label={Strings.birthDate}
              value={this.state.birthDate.value}
              error={this.state.birthDate.error}
              onChange={event => this.onBirthDateChanged(event.target.value)}
              placeholder='1374/1/1'
            />
            <Form.Input
              label={Strings.birthPlace}
              value={this.state.birthPlace.value}
              error={this.state.birthPlace.error}
              onChange={event => this.onBirthPlaceChanged(event.target.value)}
              placeholder='تهران'
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input
              label={Strings.mobileNumber}
              value={this.state.mobileNumber.value}
              error={this.state.mobileNumber.error}
              onChange={event => this.onMobileNumberChanged(event.target.value)}
              placeholder='09120000000'
            />
            <Form.Input
              label={Strings.landlineNumber}
              value={this.state.landlineNumber.value}
              error={this.state.landlineNumber.error}
              onChange={event => this.onLandlineNumberChanged(event.target.value)}
              placeholder='02166000000'
            />
          </Form.Group>
          <Form.Select
            label={Strings.gender}
            placeholder={Strings.gender}
            value={this.state.gender.value}
            error={this.state.gender.error}
            options={[{key: 'M', value: 'M', text: Strings.male}, {key: 'F', value: 'F', text: Strings.female}]}
            onChange={(_, obj) => this.onGenderChanged(obj.value)}
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
        <div className='profile__submit'>
          <Link to='/profile'><Button secondary>{Strings.back}</Button></Link>
          <Button primary onClick={() => this.submit()}>{Strings.submit}</Button>
        </div>
      </div>
    )
  }
}

export default PersonalProfile
