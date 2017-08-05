/**
 * Created by ali on 8/2/17.
 */

import React from 'react'
import { Table, Segment } from 'semantic-ui-react'
import Strings from '../../localization'
import Cookie from 'browser-cookies'

class IncomeList extends React.Component {
  renderIncome(income) {
    return <Table.Row key={income.id} >
      <Table.Cell textAlign='center'>{income.id} </Table.Cell>
      <Table.Cell textAlign='center'>{income.source}</Table.Cell>
      <Table.Cell textAlign='center'>{income.amount}</Table.Cell>
    </Table.Row>
  }
  render() {
    const incomes = this.props.incomeList.map((income) => this.renderIncome(income))
    return <Segment className='account__list'>
      <Table selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign='center'>{Strings.incomeID}</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>{Strings.incomeSource}</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>{Strings.incomeAmount}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {incomes}
        </Table.Body>
      </Table>
    </Segment>
  }
}

export default IncomeList
