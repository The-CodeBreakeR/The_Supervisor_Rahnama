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
    console.log('avval3')
    console.log(result.alarms === -1?[]:result.alarms,result.proposals === -1?[]:result.proposals)
    this.props.setTimingList(result.alarms,result.proposals)
  }

  onTimingNameChange(value) {
    this.setState({timingName: value})
  }

  search() {
    if (this.state.timingName) {
      console.log('avval2')
      fetch('/timing/search/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timingName: this.state.timingName,
        }),
      })
        .then(response => response.json())
        .then(result => this.handleResult(result))
    }
  }

  render() {
    console.log('avval')
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
