import React from 'react'
import MomentJ from 'moment-jalaali'
import { Header, Segment, Table, Button, Input, Select, Message, Dimmer, Confirm, Modal } from 'semantic-ui-react'
import { formatError } from './utils'
import Strings from '../../localization'

import CourseInfo from './CourseInfo'

class SemesterInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      year: { value: '', error: false },
      semester: { value: '', error: false },
      deleteTitle: '',
      deletingUrl: '',
      detailSemester: {},
      detailOpen: false,
      error: '',
    }
    this.fields = ['year', 'semester']
    this.semesterOptions = [
      {key: 1, value: 1, text: Strings.fall},
      {key: 2, value: 2, text: Strings.spring},
      {key: 3, value: 3, text: Strings.summer},
    ]
  }

  onYearChanged(value) {
    const thisYear = MomentJ().jYear()
    const actualYear = parseInt(value) || 0
    const error = actualYear > thisYear || actualYear < thisYear - 10
    this.setState({ year: { value, error } })
  }

  onSemesterChanged(value) {
    this.setState({ semester: { value, error: this.semesterOptions.map(o => o.key).indexOf(value) === -1 } })
  }

  validate() {
    this.onYearChanged(this.state.year.value)
    this.onSemesterChanged(this.state.semester.value)
  }

  generateErrors() {
    let errors = this.state.error
    if (this.state.year.error) {
      errors += formatError(Strings.yearError)
    }
    if (this.state.semester.error) {
      errors += formatError(Strings.semesterError)
    }
    return errors
  }

  isOK() {
    for (const field of this.fields) {
      if (!this.state[field].value || this.state[field].error) {
        return false
      }
    }
    return true
  }

  add() {
    if (this.isOK()) {
      fetch('/api/semester_info_profile/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          education_profile: this.props.educationalProfileUrl,
          year: this.state.year.value,
          semester: this.state.semester.value,
        }),
      })
        .then(response => this.handleResult())
    } else this.validate()
  }

  handleResult() {
    this.props.update()
  }

  deleteSemester(url) {
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(() => this.handleResult())
  }

  renderSemester(semester) {
    return <Table.Row key={semester.url}>
      <Table.Cell textAlign='center'>{semester.year}-{semester.semester}</Table.Cell>
      <Table.Cell textAlign='center'>
        <Button positive onClick={() => this.setState({ detailOpen: true, detailSemester: semester })}>{Strings.details}</Button>
        <Button negative onClick={() => this.setState({ deletingUrl: semester.url, deleteTitle: `${semester.year}-${semester.semester}` })}>{Strings.delete}</Button>
      </Table.Cell>
    </Table.Row>
  }

  render() {
    const errors = this.generateErrors()
    const semesters = this.props.semesterInfo.map(s => this.renderSemester(s))

    return <Dimmer.Dimmable as={Segment} dimmed={!this.props.educationalProfileUrl}>
      <Dimmer active={!this.props.educationalProfileUrl}>
        <Header as='h2' inverted>
          {Strings.pleaseCompleteEducationalProfile}
        </Header>
      </Dimmer>
      <Confirm
        open={!!this.state.deletingUrl}
        header={this.state.deleteTitle}
        content={Strings.sureDeleteSemester}
        onConfirm={() => { this.deleteSemester(this.state.deletingUrl); this.setState({deletingUrl: ''}) }}
        onCancel={() => this.setState({ deletingUrl: '' })}
        cancelButton={Strings.cancel}
        confirmButton={Strings.confirm}
      />
      <Modal
        open={this.state.detailOpen}
        onOpen={() => this.setState({ detailOpen: true })}
        onClose={() => this.setState({ detailOpen: false })}
      >
        <Modal.Header>{`${Strings.coursesInformation} ${this.state.detailSemester.semester}-${this.state.detailSemester.year}`}</Modal.Header>
        <Modal.Content>
          <CourseInfo
            semester={this.state.detailSemester}
            update={() => {
              this.props.update()
              setTimeout(() => {
                if (this.state.detailSemester.url) {
                  for (let semester of this.props.semesterInfo) {
                    if (semester.url === this.state.detailSemester.url) {
                      this.setState({detailSemester: semester})
                    }
                  }
                }
              }, 250)
            }}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={() => this.setState({ detailOpen: false })}>{Strings.close}</Button>
        </Modal.Actions>
      </Modal>
      <Header>{Strings.semestersInformation}</Header>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign='center' width={3}>{Strings.semester}</Table.HeaderCell>
            <Table.HeaderCell textAlign='center' width={1}>{Strings.operations}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {semesters}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='3'>
              <Input
                className='add-input-right'
                value={this.state.year.value}
                placeholder={Strings.year}
                onChange={event => this.onYearChanged(event.target.value)}
              />
              <Select
                className='add-input-left'
                options={this.semesterOptions}
                value={this.state.semester.value}
                placeholder={Strings.semester}
                onChange={(_, obj) => this.onSemesterChanged(obj.value)}
              />
              <Button primary onClick={() => this.add()}>{Strings.add}</Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
      {errors && <Message
        error
        content={errors}
      />
      }
    </Dimmer.Dimmable>
  }
}

export default SemesterInfo
