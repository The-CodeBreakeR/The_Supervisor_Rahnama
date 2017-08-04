import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import Strings from '../../localization'

class ProfileButtons extends React.Component {
  render() {
    return <div>
      <Link to='/profile/personal'><Button>{Strings.personalProfile}</Button></Link>
      <Link to='/profile/educational'><Button>{Strings.educationalProfile}</Button></Link>
    </div>
  }
}

export default ProfileButtons
