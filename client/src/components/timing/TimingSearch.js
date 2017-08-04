import React from 'react'
import fetch from 'isomorphic-fetch'
import { Input, Button, Message } from 'semantic-ui-react'
import Strings from '../../localization'

class TimingSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timingName: '',
      error: '',
    }
  }

  handleResult(result) {
    if (result.status === -1) {
      this.setState({error: Strings.noTimingFound})
      this.props.setTimingList([])
    } else {
      this.setState({error: ''})
      this.props.setTimingList(result.timing)
    }
  }

  onTimingNameChange(value) {
    this.setState({timingName: value})
  }

  search() {
    if (this.state.timingName) {
      fetch('/timing/search/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.timingName,
        }),
      })
        .then(response => response.json())
        .then(result => this.handleResult(result))
    }
  }

  render() {
    return <div>
      <div>
        <Input value={this.state.timingName} placeholder={Strings.timingName} onChange={event => this.onTimingNameChange(event.target.value)}/>
        <Button onClick={() => this.search()}>{Strings.search}</Button>
      </div>
      {this.state.error &&
        <Message negative>
          <Message.Header>{Strings.error}</Message.Header>
          <p>{this.state.error}</p>
        </Message>}
    </div>
  }
}

export default TimingSearch
