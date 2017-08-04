/**
 * Created by ali on 7/31/17.
 */

import React from 'react'
import { Table } from 'semantic-ui-react'
import Strings from '../../localization'
import MomentJ from 'moment-jalaali'
import Cookie from 'browser-cookies'

class PlacesList extends React.Component {
  renderPlace(place) {
    return <Table.Row key={place.id} >
      <Table.Cell>{place.id} </Table.Cell>
      <Table.Cell>{place.size}</Table.Cell>
      <Table.Cell>{place.type}</Table.Cell>
      <Table.Cell>{place.location}</Table.Cell>
      <Table.Cell>{place.cost}</Table.Cell>
    </Table.Row>
  }
  render() {
    const places = this.props.placesList.map((place) => this.renderPlace(place))
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
