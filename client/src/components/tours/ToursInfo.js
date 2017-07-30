import React from 'react'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'
import _ from 'lodash'
import Strings from '../../localization'
import MomentJ from 'moment-jalaali'

class ToursInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      TourName: '',
      start: '',
      end: '',
      tourspec: '',
      tourprice: '',
      tourcapacity: '',
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
          console.log(result.tour)
          this.setState({TourName: result.tour.name})
          this.setState({start: MomentJ(result.tour.start_time * 1000).format('LLLL')})
          this.setState({end: MomentJ(result.tour.end_time * 1000).format('LLLL')})
          this.setState({tourprice: result.tour.price})
          this.setState({tourspec: result.tour.spec})
          this.setState({tourcapacity: result.tour.capacity})

        }
      })
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
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button primary>
          Proceed <Icon name='right chevron' />
        </Button>
      </Modal.Actions>
    </Modal>
  }
}

export default ToursInfo
