/**
 * Created by ali on 7/31/17.
 */

class ReservePlace extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      placesList: [],
    }
  }

  fetchPlacesList() {
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
        if (result.status === 0) {
          this.setState({placesList: result.tours})
        }
      })
  }

  render() {
    return <div>
      <Input value={this.state.tourName} placeholder={Strings.tourName} onChange={event => this.onTourNameChange(event.target.value)}/>
      <Button onClick={() => this.search()}>{Strings.search}</Button>
    </div>
  }
}

export default ReservePlace
