import React from 'react'
import { Segment, Table } from 'semantic-ui-react'
import Strings from '../../localization'
import MomentJ from 'moment-jalaali'
import ToursInfo from './ToursInfo'

class ToursList extends React.Component {
  renderTour(tour) {
    return <Table.Row key={tour.id} >
      <Table.Cell textAlign='center'>{tour.id} </Table.Cell>
      <Table.Cell textAlign='center'>{tour.name}</Table.Cell>
      <Table.Cell textAlign='center'>{MomentJ(tour.start_time * 1000).format('LLLL')}</Table.Cell>
      <Table.Cell textAlign='center'>{MomentJ(tour.end_time * 1000).format('LLLL')}</Table.Cell>
      <Table.Cell textAlign='center'>{tour.price}</Table.Cell>
      <Table.Cell textAlign='center'><ToursInfo tourId={tour.id} /></Table.Cell>
    </Table.Row>
  }
  render() {
    const tours = this.props.toursList.map((tour) => this.renderTour(tour))
    return <Segment className='tours__list'>
      <Table selectable>
        <Table.Header className='tours__list_header' >
          <Table.Row>
            <Table.HeaderCell textAlign='center'>{Strings.tourId}</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>{Strings.tourName}</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>{Strings.startDate}</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>{Strings.endDate}</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>{Strings.tourPrice}</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>{Strings.forMoreInfo}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tours}
        </Table.Body>
      </Table>
    </Segment>
  }
}

export default ToursList
