import React from 'react'
import { Route } from 'react-router-dom'
import { Segment, Header, Button } from 'semantic-ui-react'

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
import LogoInfo from './LogoInfo.js'

import Strings from '../localization'
import RegistrationModal from './user/RegistrationModal'
import LoginModal from './user/LoginModal'

class AppBody extends React.Component {
  render() {
    const { user, loggedIn, updateProfile } = this.props
    const loginClass = loggedIn ? ' logged-in' : ' not-logged-in'
    return <Segment className={'app__body' + loginClass}>
      {!loggedIn
        ? <div className='app__auth__guest'>
          <Header>{Strings.loginWelcome}</Header>
          <p>{Strings.loginInfo}</p>
          <br/>
          <RegistrationModal onLogin={() => this.props.setLogin(true)}/>
          <LoginModal onLogin={() => this.props.setLogin(true)}/>
        </div>
        : <div className='app__body__all'>
          <div>
            <Route exact path='/' render={() => <MainPanel user={user}/>}/>
            <Route path='/profile' render={() => <UserHome updateProfile={updateProfile}/>}/>
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
          </div>
          <div className='app__footer'>
            <div className='app__footer__part'>
              <div className='app__footer__subpart1'>
                {Strings.footAdd}
                {Strings.footTel}
                {Strings.footMail}
              </div>
              <div className='app__footer__subpart1'>
                {Strings.footFollow}
                <Button className='app__social' as='a' href='https://www.facebook.com/rahnama.rahnama.98871' circular color='facebook' icon='facebook' />
                <Button className='app__social' as='a' href='https://twitter.com/rahnama' circular color='twitter' icon='twitter' />
                <Button className='app__social' as='a' href='https://www.instagram.com/rahnama.rahpooyan/' circular color='instagram' icon='instagram' />
                <Button className='app__social' as='a' href='https://aboutme.google.com/u/0/?referer=gplus' circular color='google plus' icon='google plus' />
              </div>
              <div className='app__footer__subpart2'>
                <LogoInfo/>
              </div>
            </div>
            <div className='app__footer__rights'>
              {Strings.footRights}
            </div>
          </div>
        </div>
      }
    </Segment>
  }
}

export default AppBody
