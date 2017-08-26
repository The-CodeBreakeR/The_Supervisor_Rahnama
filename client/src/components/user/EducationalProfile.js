import React from 'react'
import MomentJ from 'moment-jalaali'
import fetch from 'isomorphic-fetch'
import { Link } from 'react-router-dom'
import Strings from '../../localization'
import {formatError, getUser} from './utils'
import {Button, Header, Form, Message, Modal, Segment} from 'semantic-ui-react'

import SemesterInfo from './SemesterInfo'

class EducationalProfile extends React.Component {
  constructor(props) {
    super(props)
    this.resetState()
    this.fields = ['major', 'entranceYear', 'degree']
    this.degreeOptions = [
      {key: 'BSC', value: 'BSC', text: Strings.bachelor},
      {key: 'MSC', value: 'MSC', text: Strings.master},
      {key: 'PHD', value: 'PHD', text: Strings.doctoral},
    ]
    this.majorOptions = [
      {key: 'CE', value: 'CE', text: Strings.computerEngineering},
      {key: 'CS', value: 'CS', text: Strings.computerScience},
      {key: 'IE', value: 'IE', text: Strings.industrialEngineering},
      {key: 'ME', value: 'ME', text: Strings.mechanicalEngineering},
      {key: 'MA', value: 'MA', text: Strings.mathematics},
      {key: 'PH', value: 'PH', text: Strings.physics},
      {key: 'CH', value: 'CH', text: Strings.chemistry},
      {key: 'CI', value: 'CI', text: Strings.civil},
      {key: 'MN', value: 'MN', text: Strings.management},
      {key: 'EC', value: 'EC', text: Strings.economics},
    ]
  }

  componentWillMount() {
    this.update()
  }

  update() {
    fetch(`/api/user/${getUser().id}/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        const educational = result.educational_profile
        if (educational) {
          this.onMajorChanged(educational.major)
          this.onDegreeChanged(educational.degree)
          this.onEntranceYearChanged(educational.entrance_year)
          this.setState({ url: educational.url, semestersInfo: educational.semesters_info })
        }
      })
  }

  resetState() {
    this.state = {
      major: {value: '', error: false},
      entranceYear: {value: '', error: false},
      degree: {value: '', error: false},
      semestersInfo: [],
      error: '',
      url: '',
      done: false,
    }
  }

  onMajorChanged(value) {
    this.setState({major: {value, error: this.majorOptions.map(o => o.key).indexOf(value) === -1}})
  }

  onEntranceYearChanged(value) {
    const thisYear = MomentJ().jYear()
    const actualYear = parseInt(value) || 0
    const error = actualYear > thisYear || actualYear < thisYear - 10
    this.setState({entranceYear: {value, error}})
  }

  onDegreeChanged(value) {
    this.setState({degree: {value, error: this.degreeOptions.map(o => o.key).indexOf(value) === -1}})
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
    this.onMajorChanged(this.state.major.value)
    this.onEntranceYearChanged(this.state.entranceYear.value)
    this.onDegreeChanged(this.state.degree.value)
  }

  generateErrors() {
    let errors = this.state.error
    if (this.state.major.error) {
      errors += formatError(Strings.majorError)
    }
    if (this.state.degree.error) {
      errors += formatError(Strings.degreeError)
    }
    if (this.state.entranceYear.error) {
      errors += formatError(Strings.entranceYearError)
    }
    return errors
  }

  submit() {
    if (this.isOK()) {
      fetch(this.state.url || '/api/educational_profile/', {
        method: this.state.url ? 'PATCH' : 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: `/api/user/${getUser().id}/`,
          major: this.state.major.value,
          degree: this.state.degree.value,
          entrance_year: this.state.entranceYear.value,
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
          onClose={() => this.setState({ done: true })}
        >
          <Modal.Header>{Strings.educationalProfile}</Modal.Header>
          <Modal.Content>
            {Strings.profileSuccessfullySubmitted}
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
        <Segment>
          <Header>{Strings.educationalProfile}</Header>
          <p>{Strings.educationalProfileMessage}</p>
          <Form className='profile-form'>
            <Form.Group widths='equal'>
              <Form.Select
                className='educational-profile__degree'
                label={Strings.degree}
                value={this.state.degree.value}
                error={this.state.degree.error}
                options={this.degreeOptions}
                onChange={(_, obj) => this.onDegreeChanged(obj.value)}
                placeholder={Strings.degree}
              />
              <Form.Input
                label={Strings.entranceYear}
                value={this.state.entranceYear.value}
                error={this.state.entranceYear.error}
                onChange={event => this.onEntranceYearChanged(event.target.value)}
                placeholder='1393'
              />
            </Form.Group>
            <Form.Select
              className='educational-profile__major'
              label={Strings.major}
              placeholder={Strings.major}
              options={this.majorOptions}
              value={this.state.major.value}
              error={this.state.major.error}
              onChange={(_, obj) => this.onMajorChanged(obj.value)}
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
        </Segment>
        <SemesterInfo
          educationalProfileUrl={this.state.url}
          semesterInfo={this.state.semestersInfo}
          update={() => this.update()}
        />
      </div>
    )
  }
}

export default EducationalProfile
