import React from 'react'
import fetch from 'isomorphic-fetch'
import { Button, Header, Image, Modal,Segment,Table } from 'semantic-ui-react'
import Strings from '../../localization'

import HardDayInfo from './SchedulingInfo2'
import MomentJ from 'moment-jalaali'

// import SchedulingList from './SchedulingList'

class HardDayModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      schedulingList: [{id: 0, end_time: ''}],
      error: '',
    }
  }

  componentWillMount () {
    if (true) {
      fetch('/scheduling/hardDay/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })
        .then(response => response.json())
        .then(result => {
            this.setState({schedulingList: result.scheduling})
            console.log('fd',this.state.schedulingList)
        })
    }
  }

  renderScheduling (scheduling) {
    console.log('jkl', scheduling.end_time)
    return <HardDayInfo key={Math.random()} date={scheduling.end_time}
                     label={MomentJ(scheduling.end_time * 1000).format('LL')}/>
  }

  render() {
    const scheduling = this.state.schedulingList.map((scheduling) => this.renderScheduling(scheduling))
    return <div>
    <Table basic='very' celled selectable scrolling className="scheduling__box">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className='Header'>{Strings.HardDay}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <div className="body">
          <p>{Strings.hardDayInfo}</p>
          <div className="buttons">
          {scheduling}
          </div>
          </div>
        </Table.Body>

    </Table></div>
  }
}

export default HardDayModal
