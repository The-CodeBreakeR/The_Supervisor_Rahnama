/**
 * Created by ali on 8/5/17.
 */

import React from 'react'
import fetch from 'isomorphic-fetch'
import Cookie from 'browser-cookies'
import { Header } from 'semantic-ui-react'
import Strings from '../../localization'
import ScheduleList from './ScheduleList'
import RuleList from './RuleList'
import RecommendationList from './RecommendationList'

class InternshipHome extends React.Component {
  render() {
    return <div className='internship'>
      <Header>{Strings.rulesTable}</Header>
      <ScheduleList/>
      <RuleList/>
      <RecommendationList/>
      <Link to='/internship/companies'><Button className='internship__mainbutton' size='massive' color='red'>{Strings.internCompanies}</Button></Link>
    </div>
  }
}

export default InternshipHome
