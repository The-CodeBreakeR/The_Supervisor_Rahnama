import React from 'react'
import TimingReport from './TimingReport'
import TimingProject from './TimingProject'
import TimingEndDuration from './TimingEndDuration'
import TimingIntern from './TimingIntern'
import TimingSearch from './TimingSearch'
import Strings from '../../localization'
import { Table, Header } from 'semantic-ui-react'

import { Grid } from 'semantic-ui-react'
class TimingHome extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      timingList: [],
      alarms: {items: [{info: '', date: 0}], status: 0},
      proposals: {items: [{info: '', date: 0}], status: 0},
    }
  }

  componentWillMount () {
    console.log('hey31')
    fetch('/timing/search/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timingName: '',
      }),
    })
      .then(response => response.json())
      .then(result => {
        this.setState({alarms: result.alarms, proposals: result.proposals})

      })
  }

  renderItem (item) {
    console.log('hey2232', item)
    return <Table.Row key={Math.random()}>
      <Table.Cell>{item.info}</Table.Cell>
    </Table.Row>
  }

  setTimingList (alarms, proposals) {
    console.log('hey2', alarms, proposals)
    this.setState({alarms: alarms})
    this.setState({proposals: proposals})
  }

  render () {
    console.log('hey221')
    const alarms = this.state.alarms.items.map((item) => this.renderItem(item))
    const proposals = this.state.proposals.items.map((item) => this.renderItem(item))
    console.log('hey222', alarms, proposals)
    return <Grid centered className='timing'>
      <Grid.Column className="column1">
        <Grid.Row>
          <TimingSearch setTimingList={(alarms, proposals) => this.setTimingList(alarms, proposals)}/>
          <Header>{Strings.lastAlarms}</Header>
          <Table basic='very' celled selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>{Strings.alarm}</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {alarms}
            </Table.Body>
          </Table>
          <Table basic='very' celled selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>{Strings.proposal}</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {proposals}
            </Table.Body>
          </Table>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <TimingProject/>
            <TimingEndDuration/>
            <TimingIntern/>
          </Grid.Column>
        </Grid.Row>
      </Grid.Column>
      <Grid.Column className="column2">
        <TimingReport/>
      </Grid.Column>
    </Grid>
  }
}

export default TimingHome
