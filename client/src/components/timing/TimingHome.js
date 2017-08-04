import React from 'react'
import TimingReport from './TimingReport'
import TimingProject from './TimingProject'
import TimingEndDuration from './TimingEndDuration'
import TimingIntern from './TimingIntern'
import TimingSearch from './TimingSearch'
import Strings from '../../localization'
import { Table } from 'semantic-ui-react'

class TimingHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timingList: [],
      alarms: { items: [] } ,
      proposals: { items: [] },
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
      }),
    })
      .then(response => response.json())
      .then(result => {
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
  
  setTimingList(timingList) {
    this.setState({timingList: timingList})
  }

  render() {
    console.log(this.state.timingList)
    const alarms = this.state.alarms.items.map((item) => this.renderItem(item))
    const proposals = this.state.proposals.items.map((item) => this.renderItem(item))
    return <div><div>
      <TimingSearch setTimingList={(timingList) => this.setTimingList(timingList)} />
      <TimingReport/>
      <TimingProject/>
      <TimingEndDuration/>
      <TimingIntern/>
    </div><div>
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
    </div></div>
  }
}

export default TimingHome
