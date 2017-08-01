import React from 'react'
import { Button, Header, Icon, Image, Modal, Input } from 'semantic-ui-react'
import _ from 'lodash'
import Strings from '../../localization'
import Cookie from 'browser-cookies'

class FastReadButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      message: '',
    }
  }
  close() {
    this.setState({open: false})
  }
  ButtonClickHandle () {
    fetch('/skill/getSkill/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        skillId: 3,
      }),
    })
      .then(response => response.json())
      .then(result => this.setState({message: result.skill}))
  }
  render() {
    return <Modal trigger={<Button
      color='blue' onClick={() => this.ButtonClickHandle()}>{Strings.seeFastReadSkill}</Button>}
    open={this.state.open}
    onOpen={() => this.setState({open: true})}
    >
      <Modal.Header>{Strings.skill}</Modal.Header>
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
  }
}

export default FastReadButton
