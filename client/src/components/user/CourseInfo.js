import React from 'react'
import { Header, Segment, Table, Button, Input, Message, Dropdown } from 'semantic-ui-react'
import { formatError } from './utils'
import Strings from '../../localization'

class CourseInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      course: { value: '', error: false },
      grade: { value: '', error: false },
      error: '',
      courseOptions: [],
    }
    this.fields = ['course', 'grade']
  }

  componentWillMount() {
    fetch('/api/course/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        const processedOptions = result.map(c => {
          const courseSections = c.url.split('/')
          const courseId = courseSections[courseSections.length - 2]
          return {key: courseId, value: courseId, text: `${courseId} - ${c.name}`}
        })
        this.setState({ courseOptions: processedOptions })
      })
  }

  onCourseChanged(value) {
    this.setState({ course: { value, error: this.state.courseOptions.map(o => o.key).indexOf(value) === -1 } })
  }

  onGradeChanged(value) {
    const grade = parseFloat(value)
    this.setState({ grade: { value, error: grade < 0 || grade > 20 } })
  }

  validate() {
    this.onCourseChanged(this.state.course.value)
    this.onGradeChanged(this.state.grade.value)
  }

  generateErrors() {
    let errors = this.state.error
    if (this.state.course.error) {
      errors += formatError(Strings.courseError)
    }
    if (this.state.grade.error) {
      errors += formatError(Strings.gradeError)
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
      fetch('/api/course_info_profile/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          semester: this.props.semester.url,
          course: `/api/course/${this.state.course.value}/`,
          grade: this.state.grade.value,
        }),
      })
        .then(response => this.handleResult())
    } else this.validate()
  }

  handleResult() {
    this.props.update()
  }

  deleteCourse(url) {
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(() => this.handleResult())
  }

  renderCourse(course) {
    return <Table.Row key={course.url}>
      <Table.Cell textAlign='center'>{course.course_info.name}</Table.Cell>
      <Table.Cell textAlign='center'>{course.grade}</Table.Cell>
      <Table.Cell textAlign='center'>
        <Button negative onClick={() => this.deleteCourse(course.url)}>{Strings.delete}</Button>
      </Table.Cell>
    </Table.Row>
  }

  render() {
    const errors = this.generateErrors()
    const courses = this.props.semester.courses_info.map(c => this.renderCourse(c))

    return <Segment>
      <Header>{Strings.coursesInformation}</Header>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign='center' width={2}>{Strings.course}</Table.HeaderCell>
            <Table.HeaderCell textAlign='center' width={2}>{Strings.grade}</Table.HeaderCell>
            <Table.HeaderCell textAlign='center' width={1}>{Strings.operations}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {courses}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='5'>
              <Dropdown
                className='add-input-right'
                placeholder={Strings.courseId}
                search selection
                options={this.state.courseOptions}
                value={this.state.course.value}
                onChange={(_, obj) => this.onCourseChanged(obj.value)}
              />
              <Input
                className='add-input-left'
                placeholder={Strings.grade}
                value={this.state.grade.value}
                onChange={event => this.onGradeChanged(event.target.value)}
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
    </Segment>
  }
}

export default CourseInfo
