import React from 'react'
import { Button, Header, Icon, Image, Modal, Input } from 'semantic-ui-react'
import _ from 'lodash'
import Strings from '../../localization'
import Cookie from 'browser-cookies'
import { Link } from 'react-router-dom'
class TimingIntern extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user:''
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
      color='blue' onClick={() => this.ButtonClickHandle()}>{Strings.timingIntern}</Button>}
    open={this.state.open}
    onOpen={() => this.setState({open: true})}
    >
      <Modal.Header>{Strings.timingIntern}</Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description>
          {Strings.infoIntern}
          <br/>
          {this}
          <br/>
          <Link to='/internship'><Button>{Strings.internLogin}</Button></Link>
          {this.state.message}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => this.close()}>
          {Strings.tourStop}
        </Button>
      </Modal.Actions>
    </Modal>
  }
}

export default TimingIntern
