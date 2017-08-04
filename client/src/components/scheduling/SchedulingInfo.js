import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import Strings from '../../localization'
import MomentJ from 'moment-jalaali'
import Cookie from 'browser-cookies'

class SchedulingInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      SchedulingId: '',
      SchedulingName: '',
      start: '',
      end: '',
      schedulingcapasity: '',
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
  settingState(scheduling) {
    this.setState({SchedulingID: scheduling.id})
    this.setState({SchedulingName: scheduling.name})
    this.setState({start: MomentJ(scheduling.start_time * 1000).format('LLLL')})
    this.setState({end: MomentJ(scheduling.end_time * 1000).format('LLLL')})
    this.setState({schedulingCapasity:scheduling.capasity})
    this.statusChecker(scheduling.id)
  }

  render() {
    return <Modal trigger={<Button onClick={() => this.settingState(this.props.scheduling)}>{Strings.moreInfo}</Button>}>
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
          <p>{Strings.schedulingCapasity} : {this.state.schedulingCapasity}</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
      </Modal.Actions>
    </Modal>
  }
}

export default SchedulingInfo
