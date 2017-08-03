/**
 * Created by ali on 8/2/17.
 */

import React from 'react'
import { Table } from 'semantic-ui-react'
import Strings from '../../localization'
import Cookie from 'browser-cookies'

class ExpenseList extends React.Component {
  renderExpense(expense) {
    return <Table.Row key={expense.id} >
      <Table.Cell>{expense.id} </Table.Cell>
      <Table.Cell>{expense.destionation}</Table.Cell>
      <Table.Cell>{expense.amount}</Table.Cell>
    </Table.Row>
  }
  render() {
    const expenses = this.props.expenseList.map((expense) => this.renderExpense(expense))
    return <div>
      <Table basic='very' celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{Strings.expenseID}</Table.HeaderCell>
            <Table.HeaderCell>{Strings.expenseDestionation}</Table.HeaderCell>
            <Table.HeaderCell>{Strings.expenseAmount}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {expenses}
        </Table.Body>
      </Table>
    </div>
  }
}

export default ExpenseList
