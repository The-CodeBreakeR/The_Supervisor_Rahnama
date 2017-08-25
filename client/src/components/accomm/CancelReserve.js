import React from 'react'
import fetch from 'isomorphic-fetch'
import { Button } from 'semantic-ui-react'
import Strings from '../../localization'
import Cookie from 'browser-cookies'

class ReservePlace extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  updateAvailablePlaces() {
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
          this.props.setPlacesList(result.places)
        } else {
          this.props.setPlacesList([])
        }
      })
  }

  handleResult(result) {
    this.updateAvailablePlaces()
  }

  cancelReserve() {
    if (Cookie.get('token')) {
      fetch('/accommodation/cancelreserve/', {
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
    }
  }

  render() {
    return <div>
      <Button onClick={() => this.cancelReserve()}>{Strings.accCancel}</Button>
    </div>
  }
}

export default ReservePlace
