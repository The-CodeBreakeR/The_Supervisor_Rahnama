import React from 'react'
import { Button, Header, Icon, Image, Modal, Input } from 'semantic-ui-react'
import _ from 'lodash'
import Strings from '../../localization'
import Cookie from 'browser-cookies'

class TimingEndDuration extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user:{educational_profile:{entrance_year:0}},
      firstYear:'',
      secondYear:'',
      open: false,
      message: '',
    }
  }
  close() {
    this.setState({open: false})
  }
  ButtonClickHandle() {
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
  render() {
    return <Modal trigger={<Button
      color='blue' onClick={() => this.ButtonClickHandle()}>{Strings.timingEndDuration}</Button>}
    open={this.state.open}
    onOpen={() => this.setState({open: true})}
    onClose={() => this.setState({open: false})}
    >
      <Modal.Header>{Strings.timingEndDuration}</Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description>
          {Strings.infoDuration}
          <br/>
          {Strings.summer}:{this.state.user.educational_profile.entrance_year+4}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => this.close()} negative>
          {Strings.tourStop}
        </Button>
      </Modal.Actions>
    </Modal>
  }
}

export default TimingEndDuration
