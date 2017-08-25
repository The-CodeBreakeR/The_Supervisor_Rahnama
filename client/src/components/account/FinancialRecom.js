import React from 'react'
import fetch from 'isomorphic-fetch'
import Cookie from 'browser-cookies'
import { Header, Button } from 'semantic-ui-react'
import Strings from '../../localization'
import { Link } from 'react-router-dom'

class FinancialRecom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      condition: -1,
      balance: 0,
      answer: Strings.loginFirst,
    }
  }

  componentWillMount() {
    if (Cookie.get('token')) {
      fetch('/accounting/getcondition/', {
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
            this.setState({condition: result.condition})
            this.setState({balance: result.balance})
            if (result.condition === 0) {
              this.setState({answer: Strings.yourBalance + result.balance + Strings.tomanMibashad + '\n' +
        Strings.cond0})
            }
            if (result.condition === 1) {
              this.setState({answer: Strings.yourBalance + result.balance + Strings.tomanMibashad + '\n' +
        Strings.cond1})
            }
            if (result.condition === 2) {
              this.setState({answer: Strings.yourBalance + result.balance + Strings.tomanMibashad + '\n' +
        Strings.cond2})
            }
            if (result.condition === 3) {
              this.setState({answer: Strings.yourBalance + result.balance + Strings.tomanMibashad + '\n' +
        Strings.cond3})
            }
          }
        })
    }
  }

  render() {
    return <div>
      <div>
        {this.state.answer}
      </div>
    </div>
  }
}

export default FinancialRecom
