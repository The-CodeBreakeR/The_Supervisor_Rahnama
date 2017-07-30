import React from 'react'
import { Table } from 'semantic-ui-react'
import Strings from '../../localization'
import MomentJ from 'moment-jalaali'
import ToursInfo from './ToursInfo'

class ToursList extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     TourName: '',
  //   }
  // }
  renderTour(tour) {
    return <Table.Row key={tour.id} >
      <Table.Cell>{tour.id} </Table.Cell>
      <Table.Cell>{tour.name}</Table.Cell>
      <Table.Cell>{MomentJ(tour.start_time * 1000).format('LLLL')}</Table.Cell>
      <Table.Cell>{MomentJ(tour.end_time * 1000).format('LLLL')}</Table.Cell>
      <Table.Cell>{tour.price}</Table.Cell>
      <ToursInfo tourId={tour.id} />
    </Table.Row>
  }
  render() {
    const tours = this.props.toursList.map((tour) => this.renderTour(tour))
    return <div>
      <Table basic='very' celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{Strings.tourId}</Table.HeaderCell>
            <Table.HeaderCell>{Strings.tourName}</Table.HeaderCell>
            <Table.HeaderCell>{Strings.startDate}</Table.HeaderCell>
            <Table.HeaderCell>{Strings.endDate}</Table.HeaderCell>
            <Table.HeaderCell>{Strings.tourPrice}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tours}
        </Table.Body>
      </Table>
    </div>
  }
}

export default ToursList
