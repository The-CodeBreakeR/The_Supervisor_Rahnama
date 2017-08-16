import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import Strings from '../../localization'

class chooseRequest extends React.Component {
  render() {
    return <Modal trigger={<Button onClick={() => this.getInfo()}>{Strings.moreInfo}</Button>}>
      <Modal.Header>{Strings.tourInfo}</Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description>
          <Header>{Strings.tourInfo}</Header>
          </Modal.Description>
      </Modal.Content>
    </Modal>
  }
}

export default chooseRequest
