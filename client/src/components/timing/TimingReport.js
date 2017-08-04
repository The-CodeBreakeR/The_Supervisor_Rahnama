import React from 'react'
import { Button, Header, Icon, Image, Modal, Input } from 'semantic-ui-react'
import _ from 'lodash'
import Strings from '../../localization'
import Cookie from 'browser-cookies'

class TimingReport extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      user: {educational_profile: {semesters_info: []}},
      term: '',
      year: '',
      courseInfo:[{course_info:{name:''},credit:'',grade:''}],
    }
  }

  close () {
    this.setState({open: false})
  }

  componentWillMount(){
    console.log('bb',JSON.parse(localStorage.getItem('user')).id)
    fetch('/api/user/' + JSON.parse(localStorage.getItem('user')).id + '/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(result => this.setUser(result))
  }
  setUser(result){
    console.log(result)
    this.setState({user: result})
  }
  showTermInfo(year, term, courseInfo) {
    this.setState({term: term})
    this.setState({year: year})
    this.setState({open: true})
    this.setState({ courseInfo })
  }

  render() {
    const termSelection = this.state.user.educational_profile.semesters_info.map(semester => <Button
      key={`${semester.year}: ${semester.semester}`} onClick={() => this.showTermInfo(semester.year, semester.semester, semester.courses_info)}>{semester.year}:
      {semester.semester}</Button>)
    console.log('ddddddd',this.state.courseInfo.map(course => <p key={`${course.course_info.name} ${course.crredit} ${course.grade}`}>{course.course_info.name} {course.crredit} {course.grade}</p>))
    return <div>
      <Modal open={this.state.open} onOpen={() => this.setState({open: true})}
             onClose={() => this.setState({open: false})}>
        <Modal.Header>{Strings.termInfo}:{this.state.year}-{this.state.term}</Modal.Header>
        <Modal.Content image scrolling>
          <Modal.Description>
            <p>{Strings.termAvrage}:</p>
            <p>{Strings.creditTermCount}:</p>
            {this.state.courseInfo.map(course => <p key={`${course.course_info.name} ${course.crredit} ${course.grade}`}>{course.course_info.name} {course.crredit} {course.grade}</p>)}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => this.close()}>
            {Strings.tourStop}
          </Button>
        </Modal.Actions>
      </Modal>
      <Header>{Strings.timingReport}</Header>
      <p>{Strings.chooseTerm}</p>
      {termSelection}
    </div>
  }
}

export default TimingReport
