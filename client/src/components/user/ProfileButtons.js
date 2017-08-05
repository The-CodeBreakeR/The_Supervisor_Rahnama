import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import Strings from '../../localization'

class ProfileButtons extends React.Component {
  render() {
    return <div className='profile-buttons'>
      <Link to='/profile/personal'><Button className='profile-buttons__personal' size='massive' color='blue'>{Strings.personalProfile}</Button></Link>
      <Link to='/profile/educational'><Button size='massive' color='green'>{Strings.educationalProfile}</Button></Link>
    </div>
  }
}

export default ProfileButtons
