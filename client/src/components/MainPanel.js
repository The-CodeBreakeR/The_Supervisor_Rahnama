/**
 * Created by ali on 8/4/17.
 */

import React from 'react'
import Strings from '../localization'
import { Link } from 'react-router-dom'
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
      <Link to='/tours'><Button primary>{Strings.toursub}</Button></Link>
      <Link to='/skill'><Button color='green'>{Strings.skillsub}</Button></Link>
      <Link to='/accounting'><Button primary>{Strings.accountingsub}</Button></Link>
      <Link to='/accommodation'><Button color='green'>{Strings.accommodationsub}</Button></Link>
      <Link to='/profile'><Button primary>{Strings.profilesub}</Button></Link>
      <Link to='/internship'><Button color='green'>{Strings.internshipsub}</Button></Link>
      <Link to='/timing'><Button primary>{Strings.timingsub}</Button></Link>
      <Link to='/scheduling'><Button color='green'>{Strings.schedulingsub}</Button></Link>
    </div>
  }
}

export default MainPanel
