import React from 'react'
import { Table, Segment } from 'semantic-ui-react'
import Strings from '../../localization'
import DelExpense from './DelExpense'

class ExpenseList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  renderExpense(expense) {
    return <Table.Row key={expense.id} >
      <Table.Cell textAlign='center'>{expense.id} </Table.Cell>
      <Table.Cell textAlign='center'>{expense.destination}</Table.Cell>
      <Table.Cell textAlign='center'>{expense.amount}</Table.Cell>
      <Table.Cell textAlign='center'><DelExpense expenseID={expense.id} setExpenseList={(expenseList) => this.props.setExpenseList(expenseList)} /></Table.Cell>
    </Table.Row>
  }
  render() {
    const expenses = this.props.expenseList.map((expense) => this.renderExpense(expense))
    return <Segment className='account__list'>
      <Table selectable className='account__tablelist'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan={4} textAlign='center' className='Header'>{Strings.expenseTable}</Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell textAlign='center'>{Strings.expenseID}</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>{Strings.expenseDestination}</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>{Strings.expenseAmount}</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>{Strings.delExpense}</Table.HeaderCell>
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
