/**
 * Created by apple on 7/31/17.
 */
import React from 'react'
import { Button, Header, Icon, Image, Modal, Input } from 'semantic-ui-react'
import _ from 'lodash'
import Strings from '../../localization'
import Cookie from 'browser-cookies'

class TimingProject extends React.Component {
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
      color='blue' onClick={() => this.ButtonClickHandle()}>{Strings.timingProject}</Button>}
    open={this.state.open} onClose={() => this.setState({open: false})}
    onOpen={() => this.setState({open: true})}
    >
      <Modal.Header>{Strings.timingProject}</Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description>
          {Strings.infoProject}
          <br/>
          {Strings.firstTerm}{this.state.user.educational_profile.entrance_year+4}
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

export default TimingProject
