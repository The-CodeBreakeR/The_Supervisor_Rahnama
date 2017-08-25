import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Segment, Button } from 'semantic-ui-react'
import Strings from '../../localization'

class CompanyList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      compList: [],
    }
  }

  componentWillMount() {
    fetch('/api/internship_company/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        this.setState({compList: result})
      })
  }

  renderComp(comp) {
    return <Table.Row key={comp.id} >
      <Table.Cell textAlign='center'>{comp.field}</Table.Cell>
      <Table.Cell textAlign='center'>{comp.type}</Table.Cell>
      <Table.Cell textAlign='center'>{comp.name}</Table.Cell>
      <Table.Cell textAlign='center'>{comp.description}</Table.Cell>
      <Table.Cell textAlign='center'>{comp.contactInfo}</Table.Cell>
    </Table.Row>
  }
  render() {
    const comps = this.state.compList.map((comp) => this.renderComp(comp))
    return <div>
      <Segment className='internship__table'>
        <Table selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign='center'>{Strings.compField}</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>{Strings.compType}</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>{Strings.compName}</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>{Strings.compDescription}</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>{Strings.compContactInfo}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {comps}
          </Table.Body>
        </Table>
      </Segment>
    </div>
  }
}

export default CompanyList
