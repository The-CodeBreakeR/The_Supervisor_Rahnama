import React from 'react'
import fetch from 'isomorphic-fetch'
import Cookie from 'browser-cookies'
import { Header, Button } from 'semantic-ui-react'
import Strings from '../../localization'
import { Link } from 'react-router-dom'

import RequestList from './RequestList'
import LoanRequest from './LoanRequest'

class LoanHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      requestList: [],
    }
  }

  componentWillMount() {
    if (Cookie.get('token')) {
      fetch('/accounting/getrequest/', {
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
            this.setState({requestList: result.requests})
          }
        })
    }
  }

  setRequestList(requestList) {
    this.setState({requestList: requestList})
  }

  render() {
    return <div>
      <Header>{Strings.requestTable}</Header>
      <RequestList requestList={this.state.requestList} />
      <Header>{Strings.loanRequestInput}</Header>
      <LoanRequest/>
      <div className='account__back'>
        <Link to='/accounting'>
          <Button negative>{Strings.accountBack}</Button>
        </Link>
      </div>
    </div>
  }
}

export default LoanHome
