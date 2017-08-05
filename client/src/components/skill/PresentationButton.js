/**
 * Created by apple on 7/31/17.
 */
import React from 'react'
import { Button, Header, Icon, Image, Modal, Input } from 'semantic-ui-react'
import _ from 'lodash'
import Strings from '../../localization'
import Cookie from 'browser-cookies'
import SubmitQuestionButton from './SubmitQuestionButton'

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
    fetch('/skill/getSkill/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        skillId: 2,
      }),
    })
      .then(response => response.json())
      .then(result => this.setState({message: result.skill}))
  }
  render() {
    return <Modal trigger={<Button
      size='massive' color='blue' onClick={() => this.ButtonClickHandle()}>{Strings.seePresentationSkill}</Button>}
    open={this.state.open}
    onOpen={() => this.setState({open: true})}
    >
      <Modal.Header>{Strings.skill}</Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description className='skill__button__modal'>
          {this.state.message}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <SubmitQuestionButton/>
        <Button onClick={() => this.close()}>
          {Strings.tourStop}
        </Button>
      </Modal.Actions>
    </Modal>
  }
}

export default PresentationButton
