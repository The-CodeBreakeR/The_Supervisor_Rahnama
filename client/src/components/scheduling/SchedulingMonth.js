import React from 'react'
import fetch from 'isomorphic-fetch'
import { Input, Button, Message } from 'semantic-ui-react'
import Strings from '../../localization'
class SchedulingMonth extends React.Component {
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

  search() {
    if (this.state.schedulingName) {
      fetch('/scheduling/month/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        }),
      })
        .then(response => response.json())
        .then(result => this.handleResult(result))
    }
  }

  render() {
    return <div>
      <div>
        <Button onClick={() => this.search()}>{Strings.schedulingMonthDisplay}</Button>
      </div>
      {this.state.error &&
        <Message negative>
          <Message.Header>{Strings.error}</Message.Header>
          <p>{this.state.error}</p>
        </Message>}
    </div>
  }
}

export default SchedulingMonth
