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
    console.log('intern')
    return <Modal trigger={<Button
      color='blue' onClick={() => this.ButtonClickHandle()}>{Strings.timingIntern}</Button>}
    open={this.state.open} onClose={() => this.setState({open: false})}
    onOpen={() => this.setState({open: true})}
    >
      <Modal.Header>{Strings.timingIntern}</Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description>
          {Strings.infoIntern}
          <br/>
          {Strings.firstYear}:{this.state.user.educational_profile.entrance_year+3}
          <br/>
          {Strings.secondYear}:{this.state.user.educational_profile.entrance_year+4}
          <br/>
          <Link to='/internship'><Button primary>{Strings.internLogin}</Button></Link>
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

export default TimingIntern
