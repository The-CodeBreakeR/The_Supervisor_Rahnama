import React from 'react'
import fetch from 'isomorphic-fetch'
import { Input, Button, Message } from 'semantic-ui-react'
import Strings from '../../localization'

class ToursSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tourName: '',
      error: '',
    }
  }

  handleResult(result) {
    if (result.status === -1) {
      this.setState({error: Strings.noTourFound})
      this.props.setToursList([])
    } else {
      this.setState({error: ''})
      this.props.setToursList(result.tours)
    }
  }

  onTourNameChange(value) {
    this.setState({tourName: value})
  }

  search() {
    if (this.state.tourName) {
      fetch('/tours/search/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.tourName,
        }),
      })
        .then(response => response.json())
        .then(result => this.handleResult(result))
    }
  }

  render() {
    return <div>
      <div>
        <Input value={this.state.tourName} placeholder={Strings.tourName} onChange={event => this.onTourNameChange(event.target.value)}/>
        <Button onClick={() => this.search()} primary>{Strings.search}</Button>
      </div>
      {this.state.error &&
        <Message negative>
          <Message.Header>{Strings.error}</Message.Header>
          <p>{this.state.error}</p>
        </Message>}
    </div>
  }
}

export default ToursSearch
