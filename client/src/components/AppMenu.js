import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Strings from '../localization'
import { Menu } from 'semantic-ui-react'

class AppMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItem: '',
    }
  }

  setPlacesList(placesList) {
    this.setState({placesList: placesList})
  }

  handleItemClick(name) {
    this.setState({activeItem: name})
  }

  render() {
    const { activeItem } = this.state
    return (
      <Menu color='blue' inverted vertical>
        <Link to='/'><Menu.Item name={Strings.home} active={activeItem === 'home'} onClick={(() => this.handleItemClick('home'))}/></Link>
        <Link to='/profile'><Menu.Item name={Strings.profilesub} active={activeItem === 'profile'} onClick={(() => this.handleItemClick('profile'))}/></Link>
        <Link to='/internship'><Menu.Item name={Strings.internshipsub} active={activeItem === 'internship'} onClick={(() => this.handleItemClick('internship'))}/></Link>
        <Link to='/accommodation'><Menu.Item name={Strings.accommodationsub} active={activeItem === 'accommodation'} onClick={(() => this.handleItemClick('accommodation'))}/></Link>
        <Link to='/accounting'><Menu.Item name={Strings.accountingsub} active={activeItem === 'accounting'} onClick={(() => this.handleItemClick('accounting'))}/></Link>
        <Link to='/tours'><Menu.Item name={Strings.toursub} active={activeItem === 'tours'} onClick={(() => this.handleItemClick('tours'))}/></Link>
        <Link to='/skill'><Menu.Item name={Strings.skillsub} active={activeItem === 'skill'} onClick={(() => this.handleItemClick('skill'))}/></Link>
        <Link to='/timing'><Menu.Item name={Strings.timingsub} active={activeItem === 'timing'} onClick={(() => this.handleItemClick('timing'))}/></Link>
        <Link to='/scheduling'><Menu.Item name={Strings.schedulingsub} active={activeItem === 'scheduling'} onClick={(() => this.handleItemClick('scheduling'))}/></Link>

      </Menu>
    )
  }
}
export default AppMenu