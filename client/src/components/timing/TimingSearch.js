import React from 'react'
import fetch from 'isomorphic-fetch'
import { Input, Button, Message,Label } from 'semantic-ui-react'
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
    this.props.setTimingList(result.alarms,result.proposals)
  }

  onTimingNameChange(value) {
    this.setState({timingName: value})
    this.search()
  }

  search() {
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

  render() {
    return <div>
      <div>
        {Strings.search}: &nbsp;
        <Input value={this.state.timingName} placeholder={Strings.timingName} onChange={event => this.onTimingNameChange(event.target.value)}/>
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
