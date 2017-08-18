import React from 'react'
import fetch from 'isomorphic-fetch'
import { Button, Header, Image, Modal,Segment,Table } from 'semantic-ui-react'
import Strings from '../../localization'

import SchedulingInfo from './SchedulingInfo'
import MomentJ from 'moment-jalaali'

// import SchedulingList from './SchedulingList'

class HardDayModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      schedulingList: [],
      error: '',
    }
  }
  search() {
    if (true) {
      fetch('/scheduling/hardDay/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        }),
      })
        .then(response => response.json())
        .then(result => {
          if (result.status === 0) {
            this.setState({schedulingList: result.scheduling})
          }
        })
    }
  }
  renderScheduling(scheduling) {
    console.log(scheduling.capasity)
    return <Table.Row key={scheduling.id} >
      <Table.Cell>{MomentJ(scheduling.end_time * 1000).format('LLLL')}</Table.Cell>
      <SchedulingInfo scheduling={scheduling} />
    </Table.Row>
  }


  myrender() {
    const scheduling = this.state.schedulingList.map((scheduling) => this.renderScheduling(scheduling))
    return <div>
      <Table basic='very' celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{Strings.schedulingEndDate}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {scheduling}
        </Table.Body>
      </Table>
    </div>
  }

  render() {
    // this.myrender()
    console.log(this.state.schedulingList)
    return <Segment>
      <Header>{Strings.HardDay}</Header>
      <p>{Strings.hardDayInfo}</p>
          {/*<SchedulingList schedulingList={this.state.schedulingList} />*/}
      {this.myrender()}
      </Segment>
  }
}

export default HardDayModal
