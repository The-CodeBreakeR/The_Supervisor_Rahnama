/**
 * Created by ali on 7/31/17.
 */

import React from 'react'
import fetch from 'isomorphic-fetch'
import Cookie from 'browser-cookies'
import { Header } from 'semantic-ui-react'
import Strings from '../../localization'

import ReservePlace from './ReservePlace'
import RulesList from './RulesList'
import PlacesList from './PlacesList'

class AccommHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      placesList: [],
    }
  }

  componentWillMount() {
    fetch('/accommodation/places/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: '',
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

  render() {
    return <div className='accomm'>
      <Header>{Strings.rulesTable}</Header>
      <RulesList/>
      <Header>{Strings.placesTable}</Header>
      <PlacesList placesList={this.state.placesList} />
      <Header>{Strings.reserveInput}</Header>
      <ReservePlace setPlacesList={(placesList) => this.setPlacesList(placesList)} />
    </div>
  }
}

export default AccommHome
