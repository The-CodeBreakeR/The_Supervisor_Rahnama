import React from 'react'
import { Grid, Table, Menu } from 'semantic-ui-react'
import Strings from '../../localization'
import ScheduleList from './ScheduleList'
import RuleList from './RuleList'
import RecommendationList from './RecommendationList'
import CompanyList from './CompanyList'

class InternshipHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItem: 'photos',
    }
  }
  handleItemClick(name) {
    this.setState({activeItem: name})
  }

  render() {
    const { activeItem } = this.state
    return <Grid centered className='timing'>
      <Grid.Column className='column1'>
        <Menu tabular>
          <Menu.Item name={Strings.rulesTable} active={activeItem === 'photos'} onClick={(() => this.handleItemClick('photos'))} />
          <Menu.Item name={Strings.internCompanies} active={activeItem === 'movie'} onClick={(() => this.handleItemClick('movie'))} />
        </Menu>
        {this.state.activeItem === 'movie' && <CompanyList/>}
        {this.state.activeItem === 'photos' && <ScheduleList/>}
      </Grid.Column>
      <Grid.Column className='column2'>
        <Table basic='very' celled selectable className='timing__box'>
          <Table.Header >
            <Table.Row>
              <Table.HeaderCell className='Header'>{Strings.rule}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <div className='body'>
              <p>{Strings.forRuleClick}</p>
              <div className='buttons'>
                <RuleList/>
              </div>
            </div>
          </Table.Body>
        </Table>
        <Table basic='very' celled selectable className='timing__box'>
          <Table.Header >
            <Table.Row>
              <Table.HeaderCell className='Header'>{Strings.consoler}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <div className='body'>
              <p>{Strings.forGuideClick}</p>
              <div className='buttons'>
                <RecommendationList/>
              </div>
            </div>
          </Table.Body>
        </Table>
      </Grid.Column>
    </Grid>
  }
}

export default InternshipHome
