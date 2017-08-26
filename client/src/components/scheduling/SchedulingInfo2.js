import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import Strings from '../../localization'

import MomentJ from 'moment-jalaali'
import SchedulingList from './SchedulingList'

class HardDayInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      schedulingList: [],
    }
  }
  componentWillMount() {
    fetch('/scheduling/day/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: this.props.date,
      }),
    })
      .then(response => response.json())
      .then(result => {
        this.setState({schedulingList: result.scheduling})
      })
  }

  render() {
    return <Modal
      open={this.state.open}
      onClose={() => this.setState({open: false})}
      onOpen={() => this.setState({open: true})}
      trigger={<Button key={Math.random()} >{this.props.label}</Button>}>
      <Modal.Header>{Strings.event}&nbsp;{MomentJ(this.props.date * 1000).format('LL')}</Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description>
          <SchedulingList schedulingList={this.state.schedulingList}/>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => this.setState({open: false})} secondary>
          {Strings.stop}
        </Button>
      </Modal.Actions>
    </Modal>
  }
}

export default HardDayInfo
