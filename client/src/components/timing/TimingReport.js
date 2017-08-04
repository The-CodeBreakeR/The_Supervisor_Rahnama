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
    }
  }

  close () {
    this.setState({open: false})
  }

  ButtonClickHandle () {
    fetch('/api/user/' + JSON.parse(localStorage.getItem('user')).id + '/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timingId: 1,
      }),
    })
      .then(response => response.json())
      .then(result => this.setState({user: result}))
  }

  showTermInfo (year, term) {
    this.setState({term: term})
    this.setState({year: year})
    this
  }

  render () {
    const termSelection = this.state.user.educational_profile.semesters_info.map(x => <Button
      key={`${x.year}: ${x.semester}`} onClick={() => this.showTermInfo(x.year, x.semester)}>${x.year}:
      ${x.semester}</Button>)
    return <div>
      <Modal open={this.state.open} onOpen={() => this.setState({open: true})}
             onClose={() => this.setState({open: false})}>
        <Modal.Header>{Strings.termInfo}</Modal.Header>
        <Modal.Content image scrolling>
          <Modal.Description>
            {this.state.message}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => this.close()}>
            {Strings.tourStop}
          </Button>
        </Modal.Actions>
      </Modal>
      <Header>{Strings.timingReport}</Header>
      {this.state.user.url}
      <p>{Strings.chooseTerm}</p>
      <p>{Strings.schedulingStartDate} : {this.state.start}</p>
      {termSelection}
    </div>
  }
}

export default TimingReport
