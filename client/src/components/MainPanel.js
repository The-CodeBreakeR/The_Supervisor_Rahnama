/**
 * Created by ali on 8/4/17.
 */

import React from 'react'
import Strings from '../localization'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import fetch from 'isomorphic-fetch'
import Cookie from 'browser-cookies'

class MainPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      placesList: [],
    }
  }

  setPlacesList(placesList) {
    this.setState({placesList: placesList})
  }

  render() {
    return <div className='mainpanel'>
      <Link to='/tours'><Button className='mainpanel__button' primary>{Strings.toursub}</Button></Link>
      <Link to='/skill'><Button className='mainpanel__button' color='green'>{Strings.skillsub}</Button></Link>
      <Link to='/accounting'><Button className='mainpanel__button' primary>{Strings.accountingsub}</Button></Link>
      <Link to='/accommodation'><Button className='mainpanel__button' color='green'>{Strings.accommodationsub}</Button></Link>
      <Link to='/profile'><Button className='mainpanel__button' primary>{Strings.profilesub}</Button></Link>
      <Link to='/internship'><Button className='mainpanel__button' color='green'>{Strings.internshipsub}</Button></Link>
      <Link to='/timing'><Button className='mainpanel__button' primary>{Strings.timingsub}</Button></Link>
      <Link to='/scheduling'><Button className='mainpanel__button' color='green'>{Strings.schedulingsub}</Button></Link>
    </div>
  }
}

export default MainPanel
