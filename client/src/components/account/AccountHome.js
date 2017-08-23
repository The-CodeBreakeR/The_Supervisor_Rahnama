/**
 * Created by ali on 8/2/17.
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import Strings from '../../localization'

class AccountHome extends React.Component {
  render() {
    return <div className='account'>
      <Link to='/accounting/income'><Button className='mainpanel__button' size='massive' color='blue'>{Strings.IncomeMan}</Button></Link>
      <Link to='/accounting/expense'><Button className='mainpanel__button' size='massive' color='blue'>{Strings.ExpenseMan}</Button></Link>
      <Link to='/accounting/loan'><Button className='mainpanel__button' size='massive' color='blue'>{Strings.LoanFac}</Button></Link>
      <Link to='/accounting/recom'><Button className='mainpanel__button' size='massive' color='blue'>{Strings.financialRecom}</Button></Link>
    </div>
  }
}

export default AccountHome
