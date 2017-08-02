import React from 'react'
import fetch from 'isomorphic-fetch'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import Strings from '../../localization'

import SchedulingSearch from './SchedulingSearch'
import SchedulingList from './SchedulingList'

class SchedulingToday extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      schedulingList: [],
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
    if (true) {
      fetch('/scheduling/week/', {
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
        .then(result => {
        if (result.status === 0) {
          this.setState({schedulingList: result.scheduling})
        }
    })
  }
  }

  render() {
    return <Modal trigger={<Button onClick={() => this.search()}>{Strings.todayWorks}</Button>}>
      <Modal.Header>{Strings.todayWorks}</Modal.Header>
      <Modal.Content image scrolling>
        <Image
          size='medium'
          src='/assets/images/wireframe/image.png'
          wrapped
        />
        <Modal.Description>
          <Header>{Strings.todayWorks}</Header>
          <SchedulingList schedulingList={this.state.schedulingList} />
          <p>{this.state.status}</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
      </Modal.Actions>
    </Modal>
  }
}

export default SchedulingToday
