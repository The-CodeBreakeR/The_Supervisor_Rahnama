import React from 'react'
import { Button, Header, Modal, Grid,Table } from 'semantic-ui-react'
import Strings from '../../localization'
class TimingReport extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      user: {educational_profile: {semesters_info: []}},
      term: -1,
      value: '',
      year: '',
      notCurrentTerm: true,
      courseInfo: [{course_info: {name: '', credits: ''}, grade: ''}],
    }
  }

  close () {
    this.setState({open: false})
  }

  componentWillMount () {
    fetch('/api/user/' + JSON.parse(localStorage.getItem('user')).id + '/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => this.setUser(result))
  }

  setUser (result) {
    this.setState({user: result})
  }

  showTermInfo (semester) {
    this.setState({term: semester.semester})
    this.setState({year: semester.year})
    this.setState({open: true})
    this.setState({courseInfo: semester.courses_info})
    this.setState({notCurrentTerm: true})
  }

  showCurrentTerm (semester) {
    this.showTermInfo(semester)
    this.setState({notCurrentTerm: false})
  }

  table_maker (header, body, buttons) {
    return  <Table basic='very' celled selectable className='timing__box'>
          <Table.Header >
            <Table.Row>
              <Table.HeaderCell className='Header'>{header}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <div className='body'>
              <p>{body}</p>
              <div className='buttons'>
                {buttons}
              </div>
            </div>
          </Table.Body>
        </Table>

  }

  render() {
    const semesterInfo = this.state.user.educational_profile.semesters_info
    const termSelection = semesterInfo.map(semester => <Button
      key={`${semester.year}: ${semester.semester}`} onClick={() => this.showTermInfo(semester)}>{semester.year}:
      {semester.semester}</Button>)
    const termProgram = semesterInfo.map((semester) => <Button
      key={`${semester.year}: ${semester.semester}`} onClick={() => this.showCurrentTerm(semester)}>{semester.year}:
      {semester.semester}</Button>)[semesterInfo.length - 1]

    const semesterGrades = this.state.term > -1 && this.state.courseInfo.map(course => course.grade)
    const semesterAverage = this.state.term > -1 && semesterGrades.reduce((x, y) => x + y) / semesterGrades.length
    const semesterCreditsArray = this.state.term > -1 && this.state.courseInfo.map(course => course.course_info.credits)
    const semesterCredits = this.state.term > -1 && semesterCreditsArray.reduce((x, y) => x + y)
    return <div>
      <Modal open={this.state.open} onOpen={() => this.setState({open: true})}
             onClose={() => this.setState({open: false})}>
        <Modal.Header>{Strings.termInfo}:{this.state.year}-{this.state.term}</Modal.Header>
        <Modal.Content image scrolling>
          <Modal.Description>
            {this.state.notCurrentTerm && <p>{Strings.termAvrage}:{semesterAverage}</p>}
            <p>{Strings.creditTermCount}:{semesterCredits}</p>
            <Header>{Strings.courses}</Header>
            {this.state.courseInfo.map(course =>
              <p key={`${course.course_info.name} ${course.course_info.credits} ${course.grade}`}>
                {Strings.name}:{course.course_info.name}<br/> {Strings.credit}:{course.course_info.credits}
                <br/>{this.state.notCurrentTerm && <p>{Strings.grade}:{course.grade}<br/></p>}<br/></p>)}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => this.close()}  negative>
            {Strings.tourStop}
          </Button>
        </Modal.Actions>
      </Modal>
      <Grid>
        <Grid.Row>
          <div className='timing__box1'>
          {this.table_maker(Strings.currentTerm, Strings.currentProgram,termProgram)}
          {this.table_maker(Strings.timingReport, Strings.chooseTerm,termSelection)}
          </div>
        </Grid.Row>
      </Grid>
    </div>
  }
}

export default TimingReport
