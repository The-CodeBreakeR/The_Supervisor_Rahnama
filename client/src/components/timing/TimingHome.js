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
  table_render(header,items){
    return <Table basic='very' celled selectable>
            <Table.Header className="table__header">
              <Table.Row>
                <Table.HeaderCell>{header}</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {items}
            </Table.Body>
          </Table>
  }

  render() {
    const alarms = this.state.alarms.items.map((item) => this.renderItem(item))
    const proposals = this.state.proposals.items.map((item) => this.renderItem(item))
    return <Grid centered className='timing'>
      <Grid.Column className="column1">
        <Grid.Row>
          <Header className="app__name">{Strings.alarmsProposals}</Header>
          <TimingSearch setTimingList={(alarms, proposals) => this.setTimingList(alarms, proposals)}/>
          <Header>{Strings.lastAlarms}</Header>
          {this.table_render(Strings.alarm,alarms)}
          {this.table_render(Strings.proposal,proposals)}
          </Grid.Row>
        <Grid.Row>
          <br/>
          <br/>
          <Header className="app__name">{Strings.timingButton}</Header>
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
