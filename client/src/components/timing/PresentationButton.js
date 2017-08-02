/**
 * Created by apple on 7/31/17.
 */
import React from 'react'
import { Button, Header, Icon, Image, Modal, Input } from 'semantic-ui-react'
import _ from 'lodash'
import Strings from '../../localization'
import Cookie from 'browser-cookies'

class PresentationButton extends React.Component {
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
    fetch('/timing/getTiming/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timingId: 2,
      }),
    })
      .then(response => response.json())
      .then(result => this.setState({message: result.message()}))
  }
  render() {
    return <Modal trigger={<Button
      color='blue' onClick={() => this.ButtonClickHandle()}>{Strings.seePresentationTiming}</Button>}
    open={this.state.open}
    onOpen={() => this.setState({open: true})}
    >
      <Modal.Header>{Strings.timing}</Modal.Header>
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

export default PresentationButton
