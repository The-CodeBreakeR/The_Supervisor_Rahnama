/**
 * Created by ali on 7/31/17.
 */

import React from 'react'
import fetch from 'isomorphic-fetch'
import { Input, Button, Modal } from 'semantic-ui-react'
import Strings from '../../localization'
import Cookie from 'browser-cookies'

class AddIncome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      incAmount: '',
      incSource: '',
      pageResponse: Strings.loginFirst,
      open: false,
    }
  }

  close() {
    this.setState({open: false})
  }

  updateIncome() {
    if (Cookie.get('token')) {
      fetch('/accounting/getincome/', {
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
            this.props.setIncomeList(result.incomes)
          } else {
            this.props.setIncomeList([])
          }
        })
    }
  }

  handleResult(result) {
    if (result.status === -1) {
      this.setState({pageResponse: Strings.submitionFailed})
    } else {
      this.setState({pageResponse: Strings.submitionOK})
    }
    this.updateIncome()
  }

  submit() {
    if (Cookie.get('token')) {
      fetch('/accounting/newincome/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: JSON.parse(localStorage.getItem('user')).token,
          amount: this.state.incAmount,
          source: this.state.incSource,
        }),
      })
        .then(response => response.json())
        .then(result => this.handleResult(result))
    } else {
      this.setState({pageResponse: Strings.loginFirst})
    }
    this.onIncSource('')
    this.onIncAmount('')
  }

  onIncAmount(value) {
    this.setState({incAmount: value})
  }

  onIncSource(value) {
    this.setState({incSource: value})
  }

  render() {
    return <div>
      <Input className='account__input' value={this.state.incAmount} placeholder={Strings.incomeAmount} onChange={event => this.onIncAmount(event.target.value)}/>
      <Input className='account__input account__addr' value={this.state.incSource} placeholder={Strings.incomeSource} onChange={event => this.onIncSource(event.target.value)}/>
      <Modal trigger={<Button primary onClick={() => this.submit()}>{Strings.submitIncome}</Button>}
        open={this.state.open}
        onOpen={() => this.setState({open: true})}
      >
        <Modal.Content image scrolling>
          <Modal.Description className='account__newline'>
            {this.state.pageResponse}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => this.close()}>
            {Strings.accountBack}
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  }
}

export default AddIncome
