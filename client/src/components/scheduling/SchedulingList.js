import React from 'react'
import { Table } from 'semantic-ui-react'
import Strings from '../../localization'
import MomentJ from 'moment-jalaali'
import SchedulingInfo from './SchedulingInfo'

class SchedulingList extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     SchedulingName: '',
  //   }
  // }
  renderScheduling(scheduling) {
    return <Table.Row key={scheduling.id} >
      <Table.Cell>{scheduling.id} </Table.Cell>
      <Table.Cell>{scheduling.name}</Table.Cell>
      <Table.Cell>{MomentJ(scheduling.start_time * 1000).format('LLLL')}</Table.Cell>
      <Table.Cell>{MomentJ(scheduling.end_time * 1000).format('LLLL')}</Table.Cell>
      <Table.Cell>{scheduling.price}</Table.Cell>
      <SchedulingInfo schedulingId={scheduling.id} />
    </Table.Row>
  }
  render() {
    const scheduling = this.props.schedulingList.map((scheduling) => this.renderScheduling(scheduling))
    return <div>
      <Table basic='very' celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{Strings.schedulingId}</Table.HeaderCell>
            <Table.HeaderCell>{Strings.schedulingName}</Table.HeaderCell>
            <Table.HeaderCell>{Strings.schedulingStartDate}</Table.HeaderCell>
            <Table.HeaderCell>{Strings.schedulingEndDate}</Table.HeaderCell>
            <Table.HeaderCell>{Strings.schedulingCapacity}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {scheduling}
        </Table.Body>
      </Table>
    </div>
  }
}

export default SchedulingList
