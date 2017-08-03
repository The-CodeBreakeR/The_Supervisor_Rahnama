import React from 'react'
import CodingTimingButton from './CodingTimingButton'
import PresentationButton from './PresentationButton'
import FastReadButton from './FastReadButton'
import TypeTiming from './TypeTiming'
import Strings from '../../localization'
import SubmitQuestionButton from './SubmitQuestionButton'
import { Table } from 'semantic-ui-react'

class TimingHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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

  render() {
    console.log(this.state)
    const alarms = this.state.alarms.items.map((item) => this.renderItem(item))
    const proposals = this.state.proposals.items.map((item) => this.renderItem(item))
    return <div><div><CodingTimingButton/>
      <PresentationButton/>
      <FastReadButton/>
      <TypeTiming/>
      <SubmitQuestionButton/>
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
