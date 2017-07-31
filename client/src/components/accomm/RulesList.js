/**
 * Created by ali on 7/31/17.
 */

import React from 'react'
import { Table } from 'semantic-ui-react'
import Strings from '../../localization'
import MomentJ from 'moment-jalaali'

class RulesList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rulesList: [],
    }
  }

  componentWillMount() {
    fetch('/accommodation/rules/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: JSON.parse(localStorage.getItem('user')).token }),
    })
      .then(response => response.json())
      .then(result => {
        this.setState({rulesList: result.tours})
      })
  }

  renderTour(tour) {
    return <Table.Row key={tour.id} >
      <Table.Cell>{tour.id} </Table.Cell>
      <Table.Cell>{MomentJ(tour.start_time * 1000).format('LLLL')}</Table.Cell>
      <Table.Cell>{MomentJ(tour.end_time * 1000).format('LLLL')}</Table.Cell>
      <Table.Cell>{tour.name}</Table.Cell>
    </Table.Row>
  }
  render() {
    const rules = this.props.toursList.map((tour) => this.renderTour(tour))
    return <div>
      <Table basic='very' celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{Strings.ruleID}</Table.HeaderCell>
            <Table.HeaderCell>{Strings.ruleDate}</Table.HeaderCell>
            <Table.HeaderCell>{Strings.ruleDescription}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rules}
        </Table.Body>
      </Table>
    </div>
  }
}

export default RulesList
