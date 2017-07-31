/**
 * Created by ali on 7/31/17.
 */

import React from 'react'
import { Table } from 'semantic-ui-react'
import Strings from '../../localization'
import MomentJ from 'moment-jalaali'

class PlacesList extends React.Component {
  renderTour(tour) {
    return <Table.Row key={tour.id} >
      <Table.Cell>{tour.id} </Table.Cell>
      <Table.Cell>{tour.name}</Table.Cell>
      <Table.Cell>{MomentJ(tour.start_time * 1000).format('LLLL')}</Table.Cell>
      <Table.Cell>{MomentJ(tour.end_time * 1000).format('LLLL')}</Table.Cell>
      <Table.Cell>{tour.price}</Table.Cell>
    </Table.Row>
  }
  render() {
    const places = this.props.toursList.map((tour) => this.renderTour(tour))
    return <div>
      <Table basic='very' celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{Strings.placeID}</Table.HeaderCell>
            <Table.HeaderCell>{Strings.placeSize}</Table.HeaderCell>
            <Table.HeaderCell>{Strings.placeType}</Table.HeaderCell>
            <Table.HeaderCell>{Strings.placeLocation}</Table.HeaderCell>
            <Table.HeaderCell>{Strings.placeCost}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {places}
        </Table.Body>
      </Table>
    </div>
  }
}

export default PlacesList
