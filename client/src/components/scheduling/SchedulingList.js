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
    console.log(scheduling.capasity)
    return <Table.Row key={scheduling.id} >
      <Table.Cell>{scheduling.id} </Table.Cell>
      <Table.Cell>{scheduling.name}</Table.Cell>
      <Table.Cell>{MomentJ(scheduling.start_time * 1000).format('LL')}</Table.Cell>
      <Table.Cell>{MomentJ(scheduling.end_time * 1000).format('LL')}</Table.Cell>
        <Table.Cell><SchedulingInfo scheduling={scheduling} /> </Table.Cell>
    </Table.Row>
  }
  render() {
    const scheduling = this.props.schedulingList.map((scheduling) => this.renderScheduling(scheduling))
    return <div className="scheduling__list">
      <Table basic='very' celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className="table__header" >{Strings.schedulingId}</Table.HeaderCell>
            <Table.HeaderCell className="table__header">{Strings.schedulingName}</Table.HeaderCell>
            <Table.HeaderCell className="table__header">{Strings.schedulingStartDate}</Table.HeaderCell>
            <Table.HeaderCell className="table__header">{Strings.schedulingEndDate}</Table.HeaderCell>
            <Table.HeaderCell className="table__header">{Strings.schedulingInfoHeader}</Table.HeaderCell>
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
