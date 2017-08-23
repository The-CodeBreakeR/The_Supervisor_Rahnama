import React from 'react'
import { Button, Header, Icon, Image, Modal, Input } from 'semantic-ui-react'
import _ from 'lodash'
import Strings from '../../localization'
import Cookie from 'browser-cookies'
import SubmitQuestionButton from './SubmitQuestionButton'

class SkillGuide extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true,
    }
  }
  close() {
    this.setState({open: false})
  }
  render() {
    return <Modal
      closeIcon
      open={this.state.open}
      onOpen={() => this.setState({open: true})}
      onClose={() => this.setState({open: false})}
    >
      <Modal.Header>{Strings.skillGuide}</Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description className='skill__button__modal'>
          {Strings.skillGuideStatement1}
          {Strings.skillGuideStatement2}
          {Strings.skillGuideStatement3}
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

export default SkillGuide
