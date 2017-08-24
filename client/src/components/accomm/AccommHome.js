import React from 'react'
import { Button } from 'semantic-ui-react'
import Strings from '../../localization'
import { Link } from 'react-router-dom'

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
