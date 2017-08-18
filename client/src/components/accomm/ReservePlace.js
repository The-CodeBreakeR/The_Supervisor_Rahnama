/**
 * Created by ali on 7/31/17.
 */

import React from 'react'
import fetch from 'isomorphic-fetch'
import { Input, Button } from 'semantic-ui-react'
import Strings from '../../localization'
import Cookie from 'browser-cookies'

class ReservePlace extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  updateAvailablePlaces() {
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
          this.props.setPlacesList(result.places)
        } else {
          this.props.setPlacesList([])
        }
      })
  }

  handleResult(result) {
    if (result.status === -1) {
      alert(Strings.placeReserveFailed)
    } else {
      alert(Strings.placeReserveOK)
    }
    this.updateAvailablePlaces()
  }

  reserve() {
    if (Cookie.get('token')) {
      fetch('/accommodation/reserve/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: JSON.parse(localStorage.getItem('user')).token,
          placeID: this.props.placeID,
        }),
      })
        .then(response => response.json())
        .then(result => this.handleResult(result))
    } else {
      alert(Strings.loginFirst)
    }
  }

  render() {
    return <div>
      <Button primary onClick={() => this.reserve()}>{Strings.reservePlace}</Button>
    </div>
  }
}

export default ReservePlace
