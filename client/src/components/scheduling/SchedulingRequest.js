import React from 'react'
import { Form, Message } from 'semantic-ui-react'
import Strings from '../../localization'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

class SchedulingRequest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      capasity: '',
      end_date: '',
      info: '',
      error: '',
      accept: '',
    }
  }

  onInfoChange(value) {
    this.setState({info: value})
  }
  onNameChange(value) {
    this.setState({name: value})
  }
  onCapasityChange(value) {
    this.setState({capasity: value})
  }
  handleResult(result) {
    if (result.status === 0) {
      this.setState({error: ''})
      this.setState({accept: Strings.requestSubmitAccept})
    } else {
      this.setState({error: Strings.requestSubmitDecline})
      this.setState({accept: ''})
    }
    this.setState({request: ''})
    this.setState({ open: true })
  }
  sendRequest() {
    if (true) {
      console.log(this.state.name)
      console.log(this.state.end_date)
      console.log(this.state.info)
      console.log(this.state.capasity)
      fetch('/scheduling/request/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name,
          end_date:this.state.end_date,
          capasity:this.state.capasity,
          info:this.state.info,
        }),
      })
        .then(response => response.json())
        .then(result => this.handleResult(result))
    }
  }

  render() {
    return <Modal trigger={<Button>{Strings.schedulingNewItem}</Button>}>
      <Modal.Header>{Strings.schedulingNewItem}</Modal.Header>
      <Modal.Content image scrolling>
        <Image
          size='medium'
          src='/assets/images/wireframe/image.png'
          wrapped
        />
        <Modal.Description>
          <div>
            <div>
              <Form>
                <Form.Input value={this.state.name} label={Strings.schedulingName} placeholder={Strings.requestForScheduling} onChange={event => this.onNameChange(event.target.value)} />
                <Form.Input value={this.state.capasity} label={Strings.schedulingCapasity} placeholder={Strings.requestForScheduling} onChange={event => this.onCapasityChange(event.target.value)} />
                <Form.TextArea value={this.state.info} label={Strings.info} placeholder={Strings.requestForScheduling} onChange={event => this.onInfoChange(event.target.value)} />
                <Form.Button onClick={() => this.sendRequest()} >{Strings.submit}</Form.Button>
              </Form>
            </div>
            {this.state.error &&
              <Message negative>
                <Message.Header>{Strings.error}</Message.Header>
                <p>{Strings.requestSubmitDecline}</p>
              </Message>}
            {this.state.accept &&
              <Message positive>
                <Message.Header>{Strings.submit}</Message.Header>
                <p>{Strings.requestSubmitAccept}</p>
              </Message>}
          </div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
      </Modal.Actions>
    </Modal>
  }
}

export default SchedulingRequest
