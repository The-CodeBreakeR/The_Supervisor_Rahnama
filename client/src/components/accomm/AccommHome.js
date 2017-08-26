import React from 'react'
import { Menu } from 'semantic-ui-react'
import Strings from '../../localization'
import RulesList from './RulesList'
import ContractedList from './ContractedList'
import PlacesList from './PlacesList'
import ReservedList from './ReservedList'

class AccommHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItem: 'plc',
    }
  }

  handleItemClick(name) {
    this.setState({activeItem: name})
  }
  render() {
    const { activeItem } = this.state
    return <div className='accomm'>
      <RulesList/>

      <Menu tabular>
        <Menu.Item name={Strings.accommShowPlaces} active={activeItem === 'plc'} onClick={(() => this.handleItemClick('plc'))} />
        <Menu.Item name={Strings.accommShowReserved} active={activeItem === 'rese'} onClick={(() => this.handleItemClick('rese'))} />
        <Menu.Item name={Strings.accommShowContracted} active={activeItem === 'cont'} onClick={(() => this.handleItemClick('cont'))} />

      </Menu>
      {this.state.activeItem === 'cont' && <ContractedList/>}
      {this.state.activeItem === 'plc' && <PlacesList/>}
      {this.state.activeItem === 'rese' && <ReservedList/>}

    </div>
  }
}

export default AccommHome
