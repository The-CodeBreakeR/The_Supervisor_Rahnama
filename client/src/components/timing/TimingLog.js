import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import Strings from '../../localization'
import { Link } from 'react-router-dom'

class TimingLog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {educational_profile: {entrance_year: 0}},
      firstYear: '',
      secondYear: '',
      open: false,
      message: '',
    }
  }

  close() {
    this.setState({open: false})
  }

  componentWillMount() {
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

  setUser(result) {
    this.setState({user: result})
  }

  getButton(type) {
    if (type === 'intern') {
      return <Button
        color='blue' className='buttonLog'>
        <h3>{Strings.timingIntern}</h3>
        <br/><br/>
        {Strings.firstYear}:{this.state.user.educational_profile.entrance_year + 3}
        <br/>
        {Strings.secondYear}:{this.state.user.educational_profile.entrance_year + 4}
      </Button>
    }
    if (type === 'project') {
      return <Button
        color='blue' className='buttonLog'>
        <h3>{Strings.timingProject}</h3>
        <br/><br/>
        {Strings.firstTerm}{this.state.user.educational_profile.entrance_year + 4}
      </Button>
    }
    if (type === 'endDuration') {
      return <Button
        color='blue' className='buttonLog'>
        <h3>{Strings.timingEndDuration}</h3>
        <br/><br/>
        {Strings.summer}&nbsp;{this.state.user.educational_profile.entrance_year + 4}
      </Button>
    }
  }

  getHeader(type) {
    if (type === 'intern') {
      return <Modal.Header>{Strings.timingIntern}</Modal.Header>
    }
    if (type === 'project') {
      return <Modal.Header>{Strings.timingProject}</Modal.Header>
    }
    if (type === 'endDuration') {
      return <Modal.Header>{Strings.timingEndDuration}</Modal.Header>
    }
  }

  getDescription(type) {
    if (type === 'intern') {
      return <Modal.Description>
        {Strings.infoIntern}
        <br/>
        <br/>
        {Strings.firstYear}:{this.state.user.educational_profile.entrance_year + 3}
        <br/>
        {Strings.secondYear}:{this.state.user.educational_profile.entrance_year + 4}
        <br/>
        <br/>
        <Link to='/internship'><Button primary>{Strings.internLogin}</Button></Link>
      </Modal.Description>
    }
    if (type === 'project') {
      return <Modal.Description>
        {Strings.infoProject}
        <br/>
        {Strings.firstTerm}{this.state.user.educational_profile.entrance_year + 4}
      </Modal.Description>
    }
    if (type === 'endDuration') {
      return <Modal.Description>
        {Strings.infoDuration}
        <br/>
        {Strings.summer}:{this.state.user.educational_profile.entrance_year + 4}
      </Modal.Description>
    }
  }

  render() {
    return <Modal trigger={this.getButton(this.props.type)}
      open={this.state.open} onClose={() => this.setState({open: false})}
      onOpen={() => this.setState({open: true})}
    >
      {this.getHeader(this.props.type)}
      <Modal.Content image scrolling>
        {this.getDescription(this.props.type)}
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => this.setState({open: false})} secondary>
          {Strings.stop}
        </Button>
      </Modal.Actions>
    </Modal>
  }
}

export default TimingLog
