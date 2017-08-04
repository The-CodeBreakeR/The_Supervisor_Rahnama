/**
 * Created by ali on 8/2/17.
 */

import React from 'react'
import { Table, Segment } from 'semantic-ui-react'
import Strings from '../../localization'
import Cookie from 'browser-cookies'

class ExpenseList extends React.Component {
  renderExpense(expense) {
    return <Table.Row key={expense.id} >
      <Table.Cell textAlign='center'>{expense.id} </Table.Cell>
      <Table.Cell textAlign='center'>{expense.destination}</Table.Cell>
      <Table.Cell textAlign='center'>{expense.amount}</Table.Cell>
    </Table.Row>
  }
  render() {
    const expenses = this.props.expenseList.map((expense) => this.renderExpense(expense))
    return <Segment className='account__expenselist'>
      <Table selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign='center'>{Strings.expenseID}</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>{Strings.expenseDestination}</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>{Strings.expenseAmount}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {expenses}
        </Table.Body>
      </Table>
    </Segment>
  }
}

export default ExpenseList
