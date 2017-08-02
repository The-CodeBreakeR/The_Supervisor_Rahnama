import React from 'react'
import { Form, Message ,  Button, Header, Icon, Image, Modal, Input} from 'semantic-ui-react'
import Strings from '../../localization'

class SubmitQuestionButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      request: '',
      status: 0,
    }
  }
  close() {
    this.setState({status: 0})
    this.setState({request: ''})
    this.setState({open: false})
  }
  onRequestChange(value) {
    this.setState({request: value})
  }
  handleResult(result) {
    this.setState({status: 1})
    this.setState({ open: true })
  }
  sendRequest() {
    if (this.state.request) {
      fetch('/timing/question/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: this.state.request,
        }),
      })
        .then(response => response.json())
        .then(result => this.handleResult(result))
    }
  }

  render() {
    return <Modal trigger={<Button
      color='green' >{Strings.askTimingQuestion}</Button>}
    open={this.state.open} onOpen={() => this.setState({open: true})}>
      <Modal.Header>{Strings.askTimingQuestion}</Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description>
          {this.state.status === 0 && <Form.TextArea value={this.state.request} placeholder={Strings.askTimingQuestionSpec} onChange={event => this.onRequestChange(event.target.value)} />}
          {this.state.status === 1 && <Message positive><Message.Header>{Strings.submit}</Message.Header>
            <p>{Strings.requestSubmitAccept}</p>
          </Message>}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        {this.state.status === 0 && <Button onClick={() => this.sendRequest()} >{Strings.submit}</Button>}
        {this.state.status === 0 && <Button onClick={() => this.close()} >{Strings.cancel}</Button>}
        {this.state.status === 1 && <Button onClick={() => this.close()} >{Strings.tourStop}</Button>}
      </Modal.Actions>
    </Modal>

  }
}

export default SubmitQuestionButton
