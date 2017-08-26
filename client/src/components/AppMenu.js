import React from 'react'
import { Link } from 'react-router-dom'
import Strings from '../localization'
import { Menu, Image, Grid } from 'semantic-ui-react'
import iconDoc from '../../asset/iconDoc.png'
import iconIntern from '../../asset/iconIntern.png'
import iconBill from '../../asset/iconBill.png'
import iconAccom from '../../asset/iconAccom.png'
import iconTiming from '../../asset/iconTiming.png'
import iconTour from '../../asset/iconTour.png'
import iconSkill from '../../asset/iconSkill.png'
import iconScheduling from '../../asset/iconScheduling.png'
import iconhome from '../../asset/logo.png'
import iconlogout from '../../asset/logout-icon.png'

import Cookie from 'browser-cookies'

const MaybeMenuItem = ({name, active, onClick, disabled, linkTo, imgSrc}) => {
  const menuItem = <Menu.Item name={name} active={active} onClick={disabled ? null : onClick} disabled={disabled} >
    <Grid>
      <Grid.Row>
        <Image className='menu__image' size='mini' src={imgSrc} />
        <div className='menu__text'> {name}</div>
      </Grid.Row>
    </Grid>
  </Menu.Item>
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

  logout() {
    Cookie.erase('token')
    localStorage.removeItem('user')
    this.props.setLogin(false)
  }

  render() {
    const activeItem = location.pathname
    const { user } = this.props
    const enabled = user.personal_profile && user.educational_profile
    return (
      <Menu color='blue' inverted vertical>
        <MaybeMenuItem imgSrc={iconhome} linkTo='/' name={Strings.home} active={activeItem === '/'} onClick={(() => this.handleItemClick('/'))} />
        <MaybeMenuItem imgSrc={iconDoc} linkTo='/profile' name={Strings.profilesub} active={activeItem === '/profile' || activeItem === '/profile/personal' || activeItem === '/profile/educational'} onClick={(() => this.handleItemClick('/profile'))} />
        <MaybeMenuItem disabled={!enabled} imgSrc={iconIntern} linkTo='/internship' name={Strings.internshipsub} active={activeItem === '/internship'} onClick={(() => this.handleItemClick('/internship'))} />
        <MaybeMenuItem disabled={!enabled} imgSrc={iconAccom} linkTo='/accommodation' name={Strings.accommodationsub} active={activeItem === '/accommodation'} onClick={(() => this.handleItemClick('/accommodation'))} />
        <MaybeMenuItem disabled={!enabled} imgSrc={iconBill} linkTo='/accounting' name={Strings.accountingsub} active={activeItem === '/accounting'} onClick={(() => this.handleItemClick('/accounting'))} />
        <MaybeMenuItem disabled={!enabled} imgSrc={iconTour} linkTo='/tours' name={Strings.toursub} active={activeItem === '/tours'} onClick={(() => this.handleItemClick('/tours'))} />
        <MaybeMenuItem disabled={!enabled} imgSrc={iconSkill} linkTo='/skill' name={Strings.skillsub} active={activeItem === '/skill'} onClick={(() => this.handleItemClick('/skill'))} />
        <MaybeMenuItem disabled={!enabled} imgSrc={iconTiming} linkTo='/timing' name={Strings.timingsub} active={activeItem === '/timing'} onClick={(() => this.handleItemClick('/timing'))} />
        <MaybeMenuItem disabled={!enabled} imgSrc={iconScheduling} linkTo='/scheduling' name={Strings.schedulingsub} active={activeItem === '/scheduling'} onClick={(() => this.handleItemClick('/scheduling'))} />
        <MaybeMenuItem imgSrc={iconlogout} linkTo='/' name={Strings.logout} active={activeItem === '/lo'} onClick={(() => this.logout())} />
      </Menu>
    )
  }
}

export default AppMenu
