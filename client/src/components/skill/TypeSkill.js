import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import Strings from '../../localization'
import SubmitQuestionButton from './SubmitQuestionButton'

class TypeSkill extends React.Component {
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
  ButtonClickHandle() {
    fetch('/skill/getSkill/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        skillId: 4,
      }),
    })
      .then(response => response.json())
      .then(result => this.setState({message: result.skill}))
  }
  render() {
    return <Modal
      closeIcon
      open={this.state.open}
      onOpen={() => this.setState({open: true})}
      onClose={() => this.setState({open: false})} trigger={<Button
        size='tiny' color='blue' onClick={() => this.ButtonClickHandle()}>{Strings.skillMoreInfo}</Button>}
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

export default TypeSkill
