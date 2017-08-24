import React from 'react'
import TimingReport from './TimingReport'

import TimingLog from './TimingLog'
import TimingSearch from './TimingSearch'
import Strings from '../../localization'
import { Table, Header, Grid } from 'semantic-ui-react'

class TimingHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timingList: [],
      alarms: {items: [{info: '', date: 0}], status: 0},
      proposals: {items: [{info: '', date: 0}], status: 0},
    }
  }

  componentWillMount() {
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

  renderItem(item) {
    return <Table.Row key={Math.random()}>
      <Table.Cell>{item.info}</Table.Cell>
    </Table.Row>
  }

  setTimingList(alarms, proposals) {
    this.setState({alarms: alarms})
    this.setState({proposals: proposals})
  }

  tableRender(header, items) {
    return <Table basic='very' celled selectable>
      <Table.Header className='table__header'>
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
      <Grid.Column className='column1'>
        <Grid.Row>
          <Header className='app__name'>{Strings.alarmsProposals}</Header>
          <TimingSearch setTimingList={(alarms, proposals) => this.setTimingList(alarms, proposals)}/>
          <Header>{Strings.lastAlarms}</Header>
          {this.tableRender(Strings.alarm, alarms)}
          {this.tableRender(Strings.proposal, proposals)}
        </Grid.Row>
        <Grid.Row >
          <br/>
          <Header className='app__name'>{Strings.timingButton}</Header>
          {Strings.button_info}
          <Grid>
            <Grid.Column className='button__bar'>
              <TimingLog type='intern'/>
            </Grid.Column>
            <Grid.Column className='button__bar'>
              <TimingLog type='project'/>
            </Grid.Column>
            <Grid.Column className='button__bar'>
              <TimingLog type='endDuration'/>
              {/* <TimingProject/> */}
              {/* <TimingEndDuration/> */}
            </Grid.Column>
          </Grid>
        </Grid.Row>
      </Grid.Column>
      <Grid.Column className='column2'>
        <TimingReport/>
      </Grid.Column>
    </Grid>
  }
}

export default TimingHome
