import React from 'react'
import fetch from 'isomorphic-fetch'
import { Button, Header, Image, Modal,Segment,Table } from 'semantic-ui-react'
import Strings from '../../localization'

import HardDayInfo from './SchedulingInfo2'
import MomentJ from 'moment-jalaali'

// import SchedulingList from './SchedulingList'

class HardDayModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      schedulingList: [{id:0,end_time:''}],
      error: '',
    }
  }
  componentWillMount() {
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
    console.log('jkl',scheduling.end_date)
    return <Table.Row key={scheduling.id} >
      <Table.Cell>
        {/*{MomentJ(scheduling.end_time * 1000).format('LL')}*/}
      <HardDayInfo date={scheduling.end_time} label={MomentJ(scheduling.end_time * 1000).format('LL')}/>
    </Table.Cell>
    </Table.Row>
  }


  myrender() {
    const scheduling = this.state.schedulingList.map((scheduling) => this.renderScheduling(scheduling))
    return <div>
      <Table basic='very' celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{Strings.HardDay}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {scheduling}
        </Table.Body>
      </Table>
    </div>
  }

  render() {
     // this.search()
    console.log("sd",this.state.schedulingList)
    return <Segment>
      <Header>{Strings.HardDay}</Header>
      <p>{Strings.hardDayInfo}</p>
            {this.myrender()}
      </Segment>
  }
}

export default HardDayModal
