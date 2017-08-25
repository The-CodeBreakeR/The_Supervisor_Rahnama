import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Strings from '../localization'
import { Menu } from 'semantic-ui-react'

const MaybeMenuItem = ({name, active, onClick, disabled, linkTo}) => {
  const menuItem = <Menu.Item name={name} active={active} onClick={disabled ? null : onClick} disabled={disabled} />
  return disabled
    ? menuItem
    : <Link to={linkTo}>{menuItem}</Link>
}

class AppMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItem: '',
    }
  }

  handleItemClick(name) {
    this.setState({activeItem: name})
  }

  render() {
    const { activeItem } = this.state
    const { user } = this.props
    const enabled = user.personal_profile && user.educational_profile
    return (
      <Menu color='blue' inverted vertical>
        <Link to='/'><Menu.Item name='home' active={activeItem === 'home'} onClick={(() => this.handleItemClick('home'))}/></Link>
        <Link to='/profile'><Menu.Item name={Strings.profilesub} active={activeItem === 'profile'} onClick={(() => this.handleItemClick('profile'))}/></Link>
        <MaybeMenuItem disabled={!enabled} linkTo='/internship' name={Strings.internshipsub} active={activeItem === 'internship'} onClick={(() => this.handleItemClick('internship'))} />
        <MaybeMenuItem disabled={!enabled} linkTo='/accommodation' name={Strings.accommodationsub} active={activeItem === 'accommodation'} onClick={(() => this.handleItemClick('accommodation'))} />
        <MaybeMenuItem disabled={!enabled} linkTo='/accounting' name={Strings.accountingsub} active={activeItem === 'accounting'} onClick={(() => this.handleItemClick('accounting'))} />
        <MaybeMenuItem disabled={!enabled} linkTo='/tours' name={Strings.toursub} active={activeItem === 'tours'} onClick={(() => this.handleItemClick('tours'))} />
        <MaybeMenuItem disabled={!enabled} linkTo='/skill' name={Strings.skillsub} active={activeItem === 'skill'} onClick={(() => this.handleItemClick('skill'))} />
        <MaybeMenuItem disabled={!enabled} linkTo='/timing' name={Strings.timingsub} active={activeItem === 'timing'} onClick={(() => this.handleItemClick('timing'))} />
        <MaybeMenuItem disabled={!enabled} linkTo='/scheduling' name={Strings.schedulingsub} active={activeItem === 'scheduling'} onClick={(() => this.handleItemClick('scheduling'))} />
      </Menu>
    )
  }
}
export default AppMenu