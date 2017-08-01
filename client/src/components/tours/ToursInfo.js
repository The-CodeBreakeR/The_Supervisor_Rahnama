import React from 'react'
import { Button, Header, Icon, Image, Modal , Message } from 'semantic-ui-react'
import _ from 'lodash'
import Strings from '../../localization'
import MomentJ from 'moment-jalaali'
import ReserveButton from './ReserveButton'
import PaymentButton from './PaymentButton'
import CanselReserveButton from './CanselReserveButton'
import Cookie from 'browser-cookies'
import CommentShower from './CommentShower'

class ToursInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      TourId: '',
      TourName: '',
      start: '',
      end: '',
      tourspec: '',
      tourprice: '',
      tourcapacity: '',
      status: 4,
      commentList: [],
    }
  }
  statusChecker(id) {
    if (Cookie.get('token')) {
      fetch('/tours/status/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: JSON.parse(localStorage.getItem('user')).token,
          tourId: id,
        }),
      })
        .then(response => response.json())
        .then(result => this.setState({status: result.status}))
    }
  }
  getInfo() {
    fetch('/tours/getTour/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.props.tourId,
      }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.status === 0) {
          this.setState({TourID: result.tour.id})
          this.setState({TourName: result.tour.name})
          this.setState({start: MomentJ(result.tour.start_time * 1000).format('LLLL')})
          this.setState({end: MomentJ(result.tour.end_time * 1000).format('LLLL')})
          this.setState({tourprice: result.tour.price})
          this.setState({tourspec: result.tour.spec})
          this.setState({tourcapacity: result.tour.capacity})
          this.setState({commentList: result.comments})
          this.statusChecker(result.tour.id)
        }
      })
  }
  setStatus(stat) {
    this.setState({status: stat})
  }

  render() {
    return <Modal trigger={<Button onClick={() => this.getInfo()}>{Strings.moreInfo}</Button>}>
      <Modal.Header>{Strings.tourInfo}</Modal.Header>
      <Modal.Content image scrolling>
        <Image
          size='medium'
          src='/assets/images/wireframe/image.png'
          wrapped
        />
        <Modal.Description>
          <Header>{Strings.tourInfo}</Header>
          <p>{Strings.tourName} : {this.state.TourName}</p>
          <p>{Strings.startDate} : {this.state.start}</p>
          <p>{Strings.endDate} : {this.state.end}</p>
          <p>{Strings.info} : {this.state.tourspec}</p>
          <p>{Strings.tourPrice} : {this.state.tourprice}</p>
          <p>{Strings.tourCapacity} : {this.state.tourcapacity}</p>
          <CommentShower commnetList={this.state.commentList} getInfoRecall={() => this.getInfo()} SubmitStatus={this.state.status}/>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        {(this.state.status === 4) && <Message negative><Message.Header>{Strings.forReserveRegister}</Message.Header>
        </Message>}
        {(this.state.status === 0 || this.state.status === 3) && <ReserveButton setStatus={(stat) => this.setStatus(stat)} tourId={this.state.TourID}
          getInfoRecall={() => this.getInfo()} />}
        {(this.state.status === 1) && <PaymentButton setStatus={(stat) => this.setStatus(stat)} tourId={this.state.TourID}
          getInfoRecall={() => this.getInfo()} />}
        {(this.state.status === 2) && <CanselReserveButton setStatus={(stat) => this.setStatus(stat)} tourId={this.state.TourID}
          getInfoRecall={() => this.getInfo()} />}

      </Modal.Actions>
    </Modal>
  }
}

export default ToursInfo
