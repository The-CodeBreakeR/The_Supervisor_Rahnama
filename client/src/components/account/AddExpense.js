import React from 'react'
import fetch from 'isomorphic-fetch'
import { Input, Button, Modal } from 'semantic-ui-react'
import Strings from '../../localization'
import Cookie from 'browser-cookies'

class AddExpense extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expAmount: '',
      expDestination: '',
      pageResponse: Strings.loginFirst,
      open: false,
    }
  }

  close() {
    this.setState({open: false})
  }

  updateExpense() {
    if (Cookie.get('token')) {
      fetch('/accounting/getexpense/', {
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
            this.props.setExpenseList(result.expenses)
          } else {
            this.props.setExpenseList([])
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
    this.updateExpense()
  }

  submit() {
    if (Cookie.get('token')) {
      fetch('/accounting/newexpense/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: JSON.parse(localStorage.getItem('user')).token,
          amount: this.state.expAmount,
          destination: this.state.expDestination,
        }),
      })
        .then(response => response.json())
        .then(result => this.handleResult(result))
    } else {
      this.setState({pageResponse: Strings.loginFirst})
    }
    this.onExpDestination('')
    this.onExpAmount('')
  }

  onExpAmount(value) {
    this.setState({expAmount: value})
  }

  onExpDestination(value) {
    this.setState({expDestination: value})
  }

  render() {
    return <div>
      <Input className='account__input' value={this.state.expAmount} placeholder={Strings.expenseAmount} onChange={event => this.onExpAmount(event.target.value)}/>
      <Input className='account__input account__addr' value={this.state.expDestination} placeholder={Strings.expenseDestination} onChange={event => this.onExpDestination(event.target.value)}/>
      <Modal trigger={<Button primary onClick={() => this.submit()}>{Strings.submitExpense}</Button>}
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

export default AddExpense
