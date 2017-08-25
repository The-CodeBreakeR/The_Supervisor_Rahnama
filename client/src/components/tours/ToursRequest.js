import React from 'react'
import { Form, Message } from 'semantic-ui-react'
import Strings from '../../localization'
import Cookie from 'browser-cookies'

class ToursRequest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      request: '',
      error: '',
      accept: '',
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
      this.setState({error: Strings.haveNotRegister})
      this.setState({accept: ''})
    }
    this.setState({request: ''})
    this.setState({ open: true })
  }
  sendRequest() {
    if (Cookie.get('token')) {
      if (this.state.request) {
        fetch('/tours/request/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: JSON.parse(localStorage.getItem('user')).token,
            request: this.state.request,
          }),
        })
          .then(response => response.json())
          .then(result => this.handleResult(result))
      }
    } else {
      this.setState({error: Strings.haveNotRegister})
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
          <p>{Strings.haveNotRegister}</p>
        </Message>}
      {this.state.accept &&
        <Message positive>
          <Message.Header>{Strings.submit}</Message.Header>
          <p>{Strings.requestSubmitAccept}</p>
        </Message>}

    </div>
  }
}

export default ToursRequest
