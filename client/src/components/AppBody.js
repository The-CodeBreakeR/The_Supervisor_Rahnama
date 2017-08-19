import React from 'react'
import { Route } from 'react-router-dom'
import { Segment } from 'semantic-ui-react'

import UserHome from './user/UserHome'
import AccommHome from './accomm/AccommHome'
import RulesList from './accomm/RulesList'
import PlacesList from './accomm/PlacesList'
import ReservedList from './accomm/ReservedList'
import ContractedList from './accomm/ContractedList'
import ToursHome from './tours/ToursHome'
import SkillHome from './skill/SkillHome'
import TimingHome from './timing/TimingHome'
import SchedulingPage from './scheduling/SchedulingPage'
import AccountHome from './account/AccountHome'
import IncomeHome from './account/IncomeHome'
import ExpenseHome from './account/ExpenseHome'
import LoanHome from './account/LoanHome'
import FinancialRecom from './account/FinancialRecom'
import InternshipHome from './internship/InternshipHome'
import CompanyList from './internship/CompanyList'
import MainPanel from './MainPanel'

class AppBody extends React.Component {
  render() {
    return <Segment className='app__body'>
      <Route exact path='/' component={MainPanel}/>
      <Route path='/profile' component={UserHome}/>
      <Route path='/tours' component={ToursHome}/>
      <Route path='/skill' component={SkillHome}/>
      <Route path='/scheduling' component={SchedulingPage}/>
      <Route path='/timing' component={TimingHome}/>
      <Route exact path='/accounting' component={AccountHome}/>
      <Route path='/accounting/income' component={IncomeHome}/>
      <Route path='/accounting/expense' component={ExpenseHome}/>
      <Route path='/accounting/loan' component={LoanHome}/>
      <Route path='/accounting/recom' component={FinancialRecom}/>
      <Route exact path='/accommodation' component={AccommHome}/>
      <Route path='/accommodation/showrules' component={RulesList}/>
      <Route path='/accommodation/showplaces' component={PlacesList}/>
      <Route path='/accommodation/showreserved' component={ReservedList}/>
      <Route path='/accommodation/showcontracted' component={ContractedList}/>
      <Route exact path='/internship' component={InternshipHome}/>
      <Route path='/internship/companies' component={CompanyList}/>
    </Segment>
  }
}

export default AppBody
