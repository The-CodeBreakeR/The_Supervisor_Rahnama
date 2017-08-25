import React from 'react'
import { Button, Menu } from 'semantic-ui-react'
import Strings from '../../localization'
import IncomeHome from './IncomeHome'
import ExpenseHome from './ExpenseHome'
import LoanHome from './LoanHome'
import FinancialRecom from './FinancialRecom'

class AccountHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItem: 'rec',
    }
  }

  handleItemClick(name) {
    this.setState({activeItem: name})
  }
  render() {
    const { activeItem } = this.state
    return <div className='account'>
      <Menu tabular>
        <Menu.Item name={Strings.financialRecom} active={activeItem === 'rec'} onClick={(() => this.handleItemClick('rec'))} />
        <Menu.Item name={Strings.IncomeMan} active={activeItem === 'inc'} onClick={(() => this.handleItemClick('inc'))} />
        <Menu.Item name={Strings.ExpenseMan} active={activeItem === 'exp'} onClick={(() => this.handleItemClick('exp'))} />
        <Menu.Item name={Strings.LoanFac} active={activeItem === 'loa'} onClick={(() => this.handleItemClick('loa'))} />
      </Menu>
      {this.state.activeItem === 'rec' && <FinancialRecom/>}
      {this.state.activeItem === 'inc' && <IncomeHome/>}
      {this.state.activeItem === 'exp' && <ExpenseHome/>}
      {this.state.activeItem === 'loa' && <LoanHome/>}

    </div>
  }
}

export default AccountHome
