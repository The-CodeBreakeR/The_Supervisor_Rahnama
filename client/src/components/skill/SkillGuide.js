import React from 'react'
import { Table } from 'semantic-ui-react'
import Strings from '../../localization'

class SkillGuide extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true,
    }
  }
  close() {
    this.setState({open: false})
  }
  render() {
    return <div className='skill__guide__table'>
      <Table basic='very' celled selectable scrolling className='skill__guide'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign='center' className='Header'>{Strings.skillGuide}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body className='skill__guide__table__body'>
          <Table.Row>
            <Table.Cell className='skill__guide__table__body__cell' textAlign='center'>
              <p>
                {Strings.skillGuideStatement1}
                {Strings.skillGuideStatement2}
                {Strings.skillGuideStatement3}
              </p>
            </Table.Cell>
          </Table.Row>
        </Table.Body>

      </Table></div>
  }
}

export default SkillGuide
