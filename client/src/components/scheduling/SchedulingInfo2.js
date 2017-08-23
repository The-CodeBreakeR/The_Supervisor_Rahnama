import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import Strings from '../../localization'
import MomentJ from 'moment-jalaali'
import Cookie from 'browser-cookies'

import SchedulingList from './SchedulingList'

class HardDayInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      schedulingList:[],
    }
  }
  componentWillMount() {
    console.log("hoomw",this.props.date)
    fetch('/scheduling/day/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date:this.props.date,
      }),
    })
      .then(response => response.json())
      .then(result => {
        console.log('cmw', result.scheduling)
        this.setState({schedulingList: result.scheduling})
      })
  }

  render() {
    return <Modal closeIcon
                  open={this.state.open}
                  onClose={() => this.setState({open: false})}
                  onOpen={() => this.setState({open: true})}
                  trigger={<Button key={Math.random()} >{this.props.label}</Button>}>
      <Modal.Header>{Strings.event}</Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description>
          <SchedulingList schedulingList={this.state.schedulingList}/>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
         <Button onClick={() => this.setState({open: false})} negative>
          {Strings.stop}
        </Button>
      </Modal.Actions>
    </Modal>
  }
}

export default HardDayInfo
