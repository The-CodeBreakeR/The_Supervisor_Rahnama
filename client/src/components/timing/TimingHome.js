import React from 'react'
import TimingReport from './TimingReport'
import TimingProject from './TimingProject'
import TimingEndDuration from './TimingEndDuration'
import TimingIntern from './TimingIntern'
import TimingSearch from './TimingSearch'
import Strings from '../../localization'
import { Table,Header } from 'semantic-ui-react'
import { Calendar } from 'react-persian-datepicker'

class TimingHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timingList: [],
      alarms: { items: [],status:'' } ,
      proposals: { items: [],status:'' },
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
        timingName:'',
      }),
    })
      .then(response => response.json())
      .then(result => {
        // console.log('hey3', result.alarms, result.proposals)
        if (result.alarms.status === 0) {
          this.setState({alarms: result.alarms})
        }
        if (result.proposals.status === 0) {
          this.setState({proposals: result.proposals})
        }
      })
  }

  renderItem(item) {
    return <Table.Row>
      <Table.Cell>{item.info}</Table.Cell>
    </Table.Row>
  }

  setTimingList(alarms,proposals) {
    // console.log('hey2', alarms, proposals)
    this.setState({alarms: alarms})
    this.setState({proposals: proposals})
  }

  render() {
    console.log(this.state.timingList)
    const alarms = this.state.alarms.items.map((item) => this.renderItem(item))
    const proposals = this.state.proposals.items.map((item) => this.renderItem(item))
    return <div><div>
      <TimingSearch setTimingList={(alarms, proposals) => this.setTimingList(alarms, proposals)} />
      <TimingProject/>
      <TimingEndDuration/>
      <TimingIntern/>
    </div><div>
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
      <TimingReport/>

    </div></div>
  }
}

export default TimingHome
