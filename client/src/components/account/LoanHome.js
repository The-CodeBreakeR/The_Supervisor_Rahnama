/**
 * Created by ali on 8/9/17.
 */

import React from 'react'
import fetch from 'isomorphic-fetch'
import Cookie from 'browser-cookies'
import { Header } from 'semantic-ui-react'
import Strings from '../../localization'

import LoanRequest from './LoanRequest'
import LoanResponse from './LoanResponse'

class LoanHome extends React.Component {
  render() {
    return <div className='account'>
      <Header>{Strings.loanRequestInput}</Header>
      <LoanRequest/>
      <Header>{Strings.loanResponseInput}</Header>
      <LoanResponse/>
    </div>
  }
}

export default LoanHome
