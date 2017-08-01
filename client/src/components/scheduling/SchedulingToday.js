import React from 'react'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'
import Strings from '../../localization'
import MomentJ from 'moment-jalaali'
import CanselReserveButton from './CanselReserveButton'
import Cookie from 'browser-cookies'

class SchedulingToday extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      SchedulingId: '',
      SchedulingName: '',
      start: '',
      end: '',
      schedulingpec: '',
      schedulingprice: '',
      schedulingcapacity: '',
      status: 4,
    }
  }
  statusChecker(id) {
    if (Cookie.get('token')) {
      fetch('/scheduling/status/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: JSON.parse(localStorage.getItem('user')).token,
          schedulingId: id,
        }),
      })
        .then(response => response.json())
        .then(result => this.setState({status: result.status}))
    }
  }
  getInfo() {
    fetch('/scheduling/today/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.props.schedulingId,
      }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.status === 0) {
          console.log(result.scheduling)
          this.setState({SchedulingID: result.scheduling.id})
          this.setState({SchedulingName: result.scheduling.name})
          this.setState({start: MomentJ(result.scheduling.start_time * 1000).format('LLLL')})
          this.setState({end: MomentJ(result.scheduling.end_time * 1000).format('LLLL')})
          this.setState({schedulingprice: result.scheduling.price})
          this.setState({schedulingpec: result.scheduling.spec})
          this.setState({schedulingcapacity: result.scheduling.capacity})
          this.statusChecker(result.scheduling.id)
        }
      })
  }
  setStatus(stat) {
    this.setState({status: stat})
  }

  render() {
    return <Modal trigger={<Button onClick={() => this.getInfo()}>{Strings.moreInfo}</Button>}>
      <Modal.Header>{Strings.schedulingInfo}</Modal.Header>
      <Modal.Content image scrolling>
        <Image
          size='medium'
          src='/assets/images/wireframe/image.png'
          wrapped
        />
        <Modal.Description>
          <Header>{Strings.schedulingInfo}</Header>
          <p>{Strings.schedulingName} : {this.state.SchedulingName}</p>
          <p>{Strings.schedulingStartDate} : {this.state.start}</p>
          <p>{Strings.schedulingEndDate} : {this.state.end}</p>
          <p>{Strings.info} : {this.state.schedulingpec}</p>
          <p>{Strings.schedulingPrice} : {this.state.schedulingprice}</p>
          <p>{Strings.schedulingCapacity} : {this.state.schedulingcapacity}</p>
          <p>{this.state.status}</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
      </Modal.Actions>
    </Modal>
  }
}

export default SchedulingToday
