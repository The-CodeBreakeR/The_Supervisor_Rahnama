import React from 'react'
import Strings from '../localization'
import { Image, Item,Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import iconDoc from '../../asset/iconDoc.png'
import iconIntern from '../../asset/iconIntern.png'
import iconBill from '../../asset/iconBill.png'
import iconAccom  from '../../asset/iconAccom.png'
import iconTiming from '../../asset/iconScheduling.png'
import iconTour from '../../asset/iconTour.png'
import iconSkill from '../../asset/iconSkill.png'
import iconScheduling from '../../asset/iconScheduling.png'
class Subsystem extends React.Component {
  get_header(name){
    if ( name === 'Doc') {
      return <Link to='/profile'>{Strings.profilesub}</Link>
    }
    if ( name === 'Intern') {
      return <Link to='/internship'>{Strings.internshipsub}</Link>
    }
    if ( name === 'Bill') {
      return <Link to='/accounting'>{Strings.accountingsub}</Link>
    }
    if ( name === 'Accom') {
      return <Link to='/accommodation'>{Strings.accommodationsub}</Link>
    }
    if ( name === 'Timing') {
      return <Link to='/timing'>{Strings.timingsub}</Link>
    }
    if ( name === 'Scheduling') {
      return <Link to='/scheduling'>{Strings.schedulingsub}</Link>
    }
    if ( name === 'Tour') {
      return <Link to='/tours'>{Strings.toursub}</Link>
    }
    if ( name === 'Skill') {
      return <Link to='/skill'>{Strings.skillsub}</Link>
    }

  }
  get_segment(name,item){
    if ( name === 'Doc') {
      return <Segment className="subsystem"><Link to='/profile'>{item}</Link></Segment>
    }
    if ( name === 'Intern') {
      return <Segment className="subsystem"><Link to='/internship'>{item}</Link></Segment>
    }
    if ( name === 'Bill') {
      return <Segment className="subsystem"><Link to='/accounting'>{item}</Link></Segment>
    }
    if ( name === 'Accom') {
      return <Segment className="subsystem"><Link to='/accommodation'>{item}</Link></Segment>
    }
    if ( name === 'Timing') {
      return <Segment className="subsystem"><Link to='/timing'>{item}</Link></Segment>
    }
    if ( name === 'Scheduling') {
      return <Segment className="subsystem"><Link to='/scheduling'>{item}</Link></Segment>
    }
    if ( name === 'Tour') {
      return <Segment className="subsystem"><Link to='/tours'>{item}</Link></Segment>
    }
    if ( name === 'Skill') {
      return <Segment className="subsystem"><Link to='/skill'>{item}</Link></Segment>
    }

  }
  get_description(name){
    if ( name === 'Doc') {
      return Strings.profilesubInfo
    }
    if ( name === 'Intern') {
      return Strings.internshipsubInfo
    }
    if ( name === 'Bill') {
      return Strings.accountingsubInfo
    }
    if ( name === 'Accom') {
      return Strings.accommodationsubInfo
    }
    if ( name === 'Timing') {
      return Strings.timingsubInfo
    }
    if ( name === 'Scheduling') {
      return Strings.schedulingsubInfo
    }
    if ( name === 'Tour') {
      return Strings.toursubInfo
    }
    if ( name === 'Skill') {
      return Strings.skillsubInfo
    }
  }
  get_image(name){
    if ( name === 'Doc') {
      return iconDoc
    }
    if ( name === 'Intern') {
      return iconIntern
    }
    if ( name === 'Bill') {
      return iconBill
    }
    if ( name === 'Accom') {
      return iconAccom
    }
    if ( name === 'Timing') {
      return iconTiming
    }
    if ( name === 'Scheduling') {
      return iconScheduling
    }
    if ( name === 'Tour') {
      return iconTour
    }
    if ( name === 'Skill') {
      return iconSkill
    }
  }
  render() {
    const item = <Item.Group>
      <Item>
        <Item.Image className="subsystem__image" size='tiny' src={this.get_image(this.props.name)} />
        <Item.Content>
          <Item.Header as='a'>{this.get_header(this.props.name)}</Item.Header>
          <Item.Meta>{Strings.info}</Item.Meta>
          <Item.Description>
            {this.get_description(this.props.name)}
          </Item.Description>
        </Item.Content>
      </Item>
    </Item.Group>
    return this.get_segment(this.props.name,item)
  }
}
export default Subsystem
