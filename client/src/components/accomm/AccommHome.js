/**
 * Created by ali on 7/31/17.
 */

import React from 'react'
import fetch from 'isomorphic-fetch'

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
        token: JSON.parse(localStorage.getItem('user')).token }),
    })
      .then(response => response.json())
      .then(result => {
        this.setState({placesList: result.tours})
      })
  }

  setPlacesList(placesList) {
    this.setState({placesList: placesList})
  }

  render() {
    return <div className='accomm'>
      <RulesList/>
      <PlacesList placesList={this.state.placesList} />
      <ReservePlace setPlacesList={(placesList) => this.setPlacesList(placesList)} />
    </div>
  }
}

export default AccommHome
