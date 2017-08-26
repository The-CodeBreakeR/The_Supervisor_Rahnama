import React from 'react'
import fetch from 'isomorphic-fetch'
import Cookie from 'browser-cookies'
import { Header } from 'semantic-ui-react'
import Strings from '../../localization'

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
      <RequestList requestList={this.state.requestList} />
      <Header className='app__name'>{Strings.loanRequestInput}</Header>
      <LoanRequest setRequestList={(requestList) => this.setRequestList(requestList)} />
    </div>
  }
}

export default LoanHome
