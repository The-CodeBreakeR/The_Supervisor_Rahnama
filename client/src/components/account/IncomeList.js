/**
 * Created by ali on 8/2/17.
 */

import React from 'react'
import { Table } from 'semantic-ui-react'
import Strings from '../../localization'
import Cookie from 'browser-cookies'

class IncomeList extends React.Component {
  renderIncome(income) {
    return <Table.Row key={income.id} >
      <Table.Cell>{income.id} </Table.Cell>
      <Table.Cell>{income.source}</Table.Cell>
      <Table.Cell>{income.amount}</Table.Cell>
    </Table.Row>
  }
  render() {
    const incomes = this.props.incomeList.map((income) => this.renderIncome(income))
    return <div>
      <Table basic='very' celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{Strings.incomeID}</Table.HeaderCell>
            <Table.HeaderCell>{Strings.incomeSource}</Table.HeaderCell>
            <Table.HeaderCell>{Strings.incomeAmount}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {incomes}
        </Table.Body>
      </Table>
    </div>
  }
}

export default IncomeList
