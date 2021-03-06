import React from 'react'

import ToursList from './ToursList'
import ToursRequest from './ToursRequest'
import ToursSearch from './ToursSearch'

class ToursHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toursList: [],
    }
  }

  componentWillMount() {
    fetch('/tours/search/', {
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
          this.setState({toursList: result.tours})
        }
      })
  }

  setToursList(toursList) {
    this.setState({toursList: toursList})
  }

  render() {
    return <div className='tours'>
      <ToursSearch setToursList={(toursList) => this.setToursList(toursList)} />
      <ToursList toursList={this.state.toursList} />
      <ToursRequest/>
    </div>
  }
}

export default ToursHome
