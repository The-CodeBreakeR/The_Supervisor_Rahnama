import React from 'react'
import fetch from 'isomorphic-fetch'
import { Button, Modal } from 'semantic-ui-react'
import Strings from '../../localization'
import Cookie from 'browser-cookies'

class ReservePlace extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      massage: Strings.placeReserveOK,
      open: false,
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
    this.updateAvailablePlaces()
    if (result.status === -1) {
      // alert(Strings.placeReserveFailed)
      this.setState({massage: Strings.placeReserveFailed})
    } else {
      // alert(Strings.placeReserveOK)
      this.setState({massage: Strings.placeReserveOK})
    }
  }

  myrender() {
    return <Modal trigger={<Button primary >{Strings.reservePlace}</Button>}
      open={this.state.open} onClose={() => this.setState({open: false})}
      onOpen={() => this.setState({open: true})}
    >
      <Modal.Header>{Strings.resultAcc}</Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description className='internship__newline'>
          {Strings.placeReserveOK}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button secondary onClick={() => {
          this.reserve()
          this.setState({open: false})
        }}>
          {Strings.internCloseModal}
        </Button>
      </Modal.Actions>
    </Modal>
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
        .then(result => {
          this.handleResult(result)
        })
    }
  }

  render() {
    return <div>
      {this.myrender()}
      {/* <Button primary onClick={() => this.reserve()}>{Strings.reservePlace}</Button> */}
    </div>
  }
}

export default ReservePlace
