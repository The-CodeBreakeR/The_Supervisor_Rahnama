import React from 'react'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'
import _ from 'lodash'
import Strings from '../../localization'

class PaymentButton extends React.Component {
  render() {
    return <Modal trigger={<Button positive >{Strings.tourPayment}</Button>}>
      <Modal.Header>{Strings.tourPayment}</Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description>
          <Header>{Strings.tourPayment}</Header>
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

export default PaymentButton
