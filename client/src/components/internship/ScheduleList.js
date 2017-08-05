import React from 'react'
import { Table, Segment } from 'semantic-ui-react'
import Strings from '../../localization'
import MomentJ from 'moment-jalaali'
import Cookie from 'browser-cookies'

class ScheduleList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      schList: [],
    }
  }

  componentWillMount() {
    fetch('/api/internship_schedule/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        this.setState({schList: result})
      })
  }

  renderSch(sch) {
    return <Table.Row key={sch.id} >
      <Table.Cell textAlign='center'>{MomentJ(sch.date).format('L')}</Table.Cell>
      <Table.Cell textAlign='center'>{sch.event}</Table.Cell>
    </Table.Row>
  }
  render() {
    const schs = this.state.schList.map((sch) => this.renderSch(sch))
    return <Segment className='internship__table'>
      <Table selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign='center'>{Strings.schDate}</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>{Strings.schEvent}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {schs}
        </Table.Body>
      </Table>
    </Segment>
  }
}

export default ScheduleList
