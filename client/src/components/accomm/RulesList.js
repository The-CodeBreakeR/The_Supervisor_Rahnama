import React from 'react'
import { Table, Segment, Button, Header } from 'semantic-ui-react'
import Strings from '../../localization'
import MomentJ from 'moment-jalaali'
import { Link } from 'react-router-dom'

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
        name: '',
      }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.status === 0) {
          this.setState({rulesList: result.rules})
        }
      })
  }

  renderRule(rule) {
    return <Table.Row key={rule.id} >
      <Table.Cell textAlign='center'>{rule.id} </Table.Cell>
      <Table.Cell textAlign='center'>{MomentJ(rule.date).format('L')}</Table.Cell>
      <Table.Cell textAlign='center'>{rule.description}</Table.Cell>
    </Table.Row>
  }
  render() {
    const rules = this.state.rulesList.map((rule) => this.renderRule(rule))
    return <div>
      <Header>{Strings.rulesTable}</Header>
      <Segment className='accomm__list'>
        <Table selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign='center'>{Strings.ruleID}</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>{Strings.ruleDate}</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>{Strings.ruleDescription}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rules}
          </Table.Body>
        </Table>
      </Segment>
      <div className='accomm__back'>
        <Link to='/accommodation'>
          <Button negative>{Strings.accommBack}</Button>
        </Link>
      </div>
    </div>
  }
}

export default RulesList
