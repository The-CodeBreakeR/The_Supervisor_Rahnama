import React from 'react'
import TimingReport from './TimingReport'
import TimingProject from './TimingProject'
import TimingEndDuration from './TimingEndDuration'
import TimingIntern from './TimingIntern'
import TimingSearch from './TimingSearch'
import Strings from '../../localization'
import { Table,Header } from 'semantic-ui-react'

import { Grid } from 'semantic-ui-react'
class TimingHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timingList: [],
      alarms: { items: [{info:'',date:0}],status:0 } ,
      proposals: { items: [{info:'',date:0}],status:0 },
    }
  }

  componentWillMount() {
    console.log('hey31');
    fetch('/timing/search/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timingName:'',
      }),
    })
      .then(response => response.json())
      .then(result => {
        this.setState({alarms: result.alarms,proposals: result.proposals})
        // console.log('hey3', result.alarms, result.proposals)
        // if (result.alarms.status === 0) {
        //   console.log('hey320', result.alarms, this.alarms)
        //   // this.setState({alarms: result.alarms,proposals: result.proposals})
        //   console.log('hey3201', result.alarms)
        //   console.log('hey32', this.state.alarms)
        // }
        // if (result.proposals.status === 0) {
        //   this.setState({proposals: result.proposals})
        //   console.log('hey32',result.proposals)
        // }
      })
  }

  renderItem(item) {
    console.log('hey2232',item);
    return <Table.Row key={Math.random()}>
      <Table.Cell>{item.info}</Table.Cell>
    </Table.Row>
  }

  setTimingList(alarms,proposals) {
    console.log('hey2', alarms, proposals)
    this.setState({alarms: alarms})
    this.setState({proposals: proposals})
  }

  render() {
    console.log('hey221',alarms,proposals);
    const alarms = this.state.alarms.items.map((item) => this.renderItem(item))
    const proposals = this.state.proposals.items.map((item) => this.renderItem(item))
    console.log('hey222',alarms,proposals);
    return <Grid centered className='timing'><Grid.Row>
      <TimingProject/>
      <TimingEndDuration/>
      <TimingIntern/>
      <TimingSearch setTimingList={(alarms, proposals) => this.setTimingList(alarms, proposals)} />
    </Grid.Row>
      <Grid.Row>
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
      <TimingReport/>
      </Grid.Row>
    </Grid>
  }
}

export default TimingHome
