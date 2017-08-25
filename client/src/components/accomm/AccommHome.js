import React from 'react'
import { Button, Menu } from 'semantic-ui-react'
import Strings from '../../localization'
import { Link } from 'react-router-dom'
import RulesList from './RulesList'
import ContractedList from './ContractedList'
import PlacesList from './PlacesList'
import ReservedList from './ReservedList'

class AccommHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItem: 'photos',
    }
  }

  handleItemClick(name) {
    this.setState({activeItem: name})
  }
  render() {
     const { activeItem } = this.state
    return <div className='accomm'>
      <RulesList/>
      {/*<Link to='/accommodation/showrules'><Button className='mainpanel__button' size='massive' color='blue'>{Strings.accommShowRules}</Button></Link>*/}
      <Menu tabular>
        <Menu.Item name={Strings.accommShowPlaces}  active={activeItem === 'photos'} onClick={(() => this.handleItemClick('photos'))} />
        <Menu.Item name={Strings.accommShowReserved} active={activeItem === 'movie'} onClick={(() => this.handleItemClick('movie'))} />
        <Menu.Item name={Strings.accommShowContracted}  active={activeItem === 'bio'} onClick={(() => this.handleItemClick('bio'))} />

      </Menu>
      {this.state.activeItem === 'bio' && <ContractedList/>}
      {this.state.activeItem === 'photos' && <PlacesList/>}
      {this.state.activeItem === 'movie' && <ReservedList/>}

      {/*<Link to='/accommodation/showplaces'><Button className='mainpanel__button' size='massive' color='blue'>{Strings.accommShowPlaces}</Button></Link>*/}
      {/*<Link to='/accommodation/showreserved'><Button className='mainpanel__button' size='massive' color='blue'>{Strings.accommShowReserved}</Button></Link>*/}
      {/*<Link to='/accommodation/showcontracted'><Button className='mainpanel__button' size='massive' color='blue'>{Strings.accommShowContracted}</Button></Link>*/}
    </div>
  }
}

export default AccommHome
