/**
 * Created by ali on 7/31/17.
 */

import React from 'react'
import fetch from 'isomorphic-fetch'
import Cookie from 'browser-cookies'
import { Header, Button } from 'semantic-ui-react'
import Strings from '../../localization'
import { Link } from 'react-router-dom'

import ReservePlace from './ReservePlace'
import RulesList from './RulesList'
import PlacesList from './PlacesList'

class AccommHome extends React.Component {
  render() {
    return <div className='accomm'>
      <Link to='/accommodation/showrules'><Button className='mainpanel__button' size='massive' color='blue'>{Strings.accommShowRules}</Button></Link>
      <Link to='/accommodation/showplaces'><Button className='mainpanel__button' size='massive' color='blue'>{Strings.accommShowPlaces}</Button></Link>
      <Link to='/accommodation/showreserved'><Button className='mainpanel__button' size='massive' color='blue'>{Strings.accommShowReserved}</Button></Link>
      <Link to='/accommodation/showcontracted'><Button className='mainpanel__button' size='massive' color='blue'>{Strings.accommShowContracted}</Button></Link>
    </div>
  }
}

export default AccommHome
