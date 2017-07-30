import React from 'react'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'
import _ from 'lodash'
import Strings from '../../localization'

class ReserveButton extends React.Component {
  render() {
    return <Modal trigger={<Button primary >{Strings.tourReserve}</Button>}>
      <Modal.Header>{Strings.tourReserve}</Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description>
          <Header>{Strings.tourInfo}</Header>
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

export default ReserveButton
