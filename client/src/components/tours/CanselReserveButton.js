import React from 'react'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'
import _ from 'lodash'
import Strings from '../../localization'

class CanselReserveButton extends React.Component {
  render() {
    return <Modal trigger={<Button negative >{Strings.tourCansel}</Button>}>
      <Modal.Header>{Strings.tourCansel}</Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description>
          <Header>{Strings.tourCansel}</Header>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button >
          {Strings.tourAccepted}
        </Button>
      </Modal.Actions>
    </Modal>
  }
}

export default CanselReserveButton
