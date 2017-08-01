import React from 'react'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'
import _ from 'lodash'
import Strings from '../../localization'
import MomentJ from 'moment-jalaali'
import ReserveButton from './ReserveButton'
import PaymentButton from './PaymentButton'
import CanselReserveButton from './CanselReserveButton'
import Cookie from 'browser-cookies'

class SchedulingInfo extends React.Component {
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
    fetch('/scheduling/getScheduling/', {
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
        {(this.state.status === 0 || this.state.status === 3) && <ReserveButton setStatus={(stat) => this.setStatus(stat)} schedulingId={this.state.SchedulingID}
          getInfoRecall={() => this.getInfo()} />}
        {(this.state.status === 1) && <PaymentButton setStatus={(stat) => this.setStatus(stat)} schedulingId={this.state.SchedulingID}
          getInfoRecall={() => this.getInfo()} />}
        {(this.state.status === 2) && <CanselReserveButton setStatus={(stat) => this.setStatus(stat)} schedulingId={this.state.SchedulingID}
          getInfoRecall={() => this.getInfo()} />}
      </Modal.Actions>
    </Modal>
  }
}

export default SchedulingInfo
