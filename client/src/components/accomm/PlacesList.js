/**
 * Created by ali on 7/31/17.
 */

import React from 'react'
import { Table, Segment } from 'semantic-ui-react'
import Strings from '../../localization'
import MomentJ from 'moment-jalaali'
import Cookie from 'browser-cookies'
import ReservePlace from './ReservePlace'

class PlacesList extends React.Component {
  renderPlace(place) {
    return <Table.Row key={place.id} >
      <Table.Cell textAlign='center'>{place.id} </Table.Cell>
      <Table.Cell textAlign='center'>{place.size}</Table.Cell>
      <Table.Cell textAlign='center'>{place.type}</Table.Cell>
      <Table.Cell textAlign='center'>{place.location}</Table.Cell>
      <Table.Cell textAlign='center'>{place.cost}</Table.Cell>
      <Table.Cell textAlign='center'>{MomentJ(place.end_date).format('L')}</Table.Cell>
      <Table.Cell textAlign='center'><ReservePlace placeID={place.id} setPlacesList={(placesList) => this.props.setPlacesList(placesList)} /></Table.Cell>
    </Table.Row>
  }
  render() {
    const places = this.props.placesList.map((place) => this.renderPlace(place))
    return <Segment className='accomm__list' >
      <Table selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign='center'>{Strings.placeID}</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>{Strings.placeSize}</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>{Strings.placeType}</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>{Strings.placeLocation}</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>{Strings.placeCost}</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>{Strings.availableFrom}</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>{Strings.reservePlace}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {places}
        </Table.Body>
      </Table>
    </Segment>
  }
}

export default PlacesList
