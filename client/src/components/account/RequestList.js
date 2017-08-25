import React from 'react'
import { Table, Segment } from 'semantic-ui-react'
import Strings from '../../localization'
import RequestFollowUp from './RequestFollowUp'

class RequestList extends React.Component {
  renderRequest(request) {
    return <Table.Row key={request.id} >
      <Table.Cell textAlign='center'>{request.id} </Table.Cell>
      <Table.Cell textAlign='center'>{request.purpose}</Table.Cell>
      <Table.Cell textAlign='center'>{request.amount}</Table.Cell>
      <Table.Cell textAlign='center'><RequestFollowUp reqID={request.id} /></Table.Cell>
    </Table.Row>
  }
  render() {
    const requests = this.props.requestList.map((request) => this.renderRequest(request))
    return <Segment className='account__list'>
      <Table selectable className='account__tablelist'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan={4} textAlign='center' className='Header'>{Strings.requestTable}</Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell textAlign='center'>{Strings.requestID}</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>{Strings.requestPurpose}</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>{Strings.requestAmount}</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>{Strings.followUp}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {requests}
        </Table.Body>
      </Table>
    </Segment>
  }
}

export default RequestList
