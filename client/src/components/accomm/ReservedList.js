import React from 'react'
import { Table, Segment } from 'semantic-ui-react'
import Strings from '../../localization'
import MomentJ from 'moment-jalaali'
import CancelReserve from './CancelReserve'

class ReservedList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      placesList: [],
    }
  }

  componentWillMount() {
    fetch('/accommodation/resplaces/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: JSON.parse(localStorage.getItem('user')).token,
      }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.status === 0) {
          this.setState({placesList: result.places})
        }
      })
  }

  setPlacesList(placesList) {
    this.setState({placesList: placesList})
  }

  renderPlace(place) {
    return <Table.Row key={place.id} >
      <Table.Cell textAlign='center'>{place.id} </Table.Cell>
      <Table.Cell textAlign='center'>{place.size}</Table.Cell>
      <Table.Cell textAlign='center'>{place.type}</Table.Cell>
      <Table.Cell textAlign='center'>{place.location}</Table.Cell>
      <Table.Cell textAlign='center'>{place.cost}</Table.Cell>
      <Table.Cell textAlign='center'>{MomentJ(place.end_date).format('L')}</Table.Cell>
      <Table.Cell textAlign='center'><CancelReserve placeID={place.id} setPlacesList={(placesList) => this.setPlacesList(placesList)} /></Table.Cell>
    </Table.Row>
  }
  render() {
    const places = this.state.placesList.map((place) => this.renderPlace(place))
    return <div>
      <Segment className='accomm__list' >
        <Table selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign='center'>{Strings.placeID}</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>{Strings.placeSize}</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>{Strings.placeType}</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>{Strings.placeLocation}</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>{Strings.placeCost}</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>{Strings.availableFrom}</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>{Strings.accCancel}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {places}
          </Table.Body>
        </Table>
      </Segment>
    </div>
  }
}

export default ReservedList
