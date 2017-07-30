import React from 'react'
import { Form, Message } from 'semantic-ui-react'
import Strings from '../../localization'

class SubmitQuestionButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      request: '',
      state: 0,
    }
  }

  onRequestChange(value) {
    this.setState({request: value})
  }
  handleResult(result) {
    if (result.status === 0) {
      this.setState({error: ''})
      this.setState({accept: Strings.requestSubmitAccept})
    } else {
      this.setState({error: Strings.requestSubmitDecline})
      this.setState({accept: ''})
    }
    this.setState({ open: true })
  }
  sendRequest() {
    if (this.state.request) {
      fetch('/tours/request/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          request: this.state.request,
        }),
      })
        .then(response => response.json())
        .then(result => this.handleResult(result))
    }
  }

  render() {
    return <div>
      <div>
        <Form>
          <Form.TextArea value={this.state.request} label={Strings.requestForTour} placeholder={Strings.requestForTourSpec} onChange={event => this.onRequestChange(event.target.value)} />
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
  }
}

export default SubmitQuestionButton
