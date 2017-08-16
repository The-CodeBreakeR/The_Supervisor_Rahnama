import React from 'react'
import { Link } from 'react-router-dom'
import { Button,Header,Modal } from 'semantic-ui-react'
import Strings from '../../localization'

class chooseRequest extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <Modal closeIcon
                  trigger={<Header>ههه<Button  onClick={() => this.props.sendRequest()}>{Strings.submit}</Button></Header>}
    >
      <Modal.Header>{Strings.tourInfo}</Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description>
          <Header>{Strings.tourInfo}</Header>
            {/*<Button onClick={() => this.props.setPage('main')}>{Strings.submit}</Button>*/}
            {/*<Button onClick={() =>this.props.sendRequest('request')}>{Strings.submit}</Button>*/}
          </Modal.Description>

      </Modal.Content>
      <Modal.Action></Modal.Action>
    </Modal>
  }
}

export default chooseRequest
