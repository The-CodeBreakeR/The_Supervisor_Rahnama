import React from 'react'
import fetch from 'isomorphic-fetch'
import { Input, Button, Message } from 'semantic-ui-react'
import Strings from '../../localization'

class SchedulingSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      schedulingName: '',
      error: '',
    }
  }

  handleResult(result) {
    if (result.status === -1) {
      this.setState({error: Strings.noSchedulingFound})
      this.props.setSchedulingList([])
    } else {
      this.setState({error: ''})
      this.props.setSchedulingList(result.scheduling)
    }
  }

  onSchedulingNameChange(value) {
    this.setState({schedulingName: value})
  }

  search() {
    if (this.state.schedulingName) {
      fetch('/scheduling/search/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.schedulingName,
        }),
      })
        .then(response => response.json())
        .then(result => this.handleResult(result))
    }
  }

  render() {
    return <div>
      <div>
        <Input value={this.state.schedulingName} placeholder={Strings.schedulingName} onChange={event => this.onSchedulingNameChange(event.target.value)}/>
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

export default SchedulingSearch
