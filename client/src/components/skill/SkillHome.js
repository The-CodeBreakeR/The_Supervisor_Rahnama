import React from 'react'
import CodingSkillButton from './CodingSkillButton'
import PresentationButton from './PresentationButton'
import FastReadButton from './FastReadButton'
import { Grid, Item, Segment } from 'semantic-ui-react'
import TypeSkill from './TypeSkill'
import SkillGuide from './SkillGuide'
import Strings from '../../localization'
import codingIcon from '../../../asset/codingIcon.png'
import peresentIcon from '../../../asset/persentIcon.svg'
import typingIcon from '../../../asset/typingIcon.png'
import readingIcon from '../../../asset/readingIcon.svg'

import AnswerQuestionShower from './AnswerQuestionShower'

class SkillHome extends React.Component {
  render() {
    return <Grid >
      <Grid.Row centered>
        <SkillGuide/>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Segment className='subsystem'>
          <Item.Group>
            <Item>
              <Item.Image className='subsystem__image' size='tiny' src={typingIcon} />
              <Item.Content>
                <Item.Header as='a'>{Strings.seeCodingSkill}</Item.Header>
                <Item.Description>
                  {Strings.skillCodingInfo}
                  <br/>
                  <CodingSkillButton/>
                </Item.Description>
              </Item.Content>
            </Item></Item.Group></Segment>
        <Segment className='subsystem'>
          <Item.Group>
            <Item>
              <Item.Image className='subsystem__image' size='tiny' src={peresentIcon} />
              <Item.Content>
                <Item.Header as='a'>{Strings.seePresentationSkill}</Item.Header>
                <Item.Description>
                  {Strings.skillPresentInfo}
                  <br/>
                  <PresentationButton/>
                </Item.Description>
              </Item.Content>
            </Item></Item.Group></Segment>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Segment className='subsystem'>
          <Item.Group>
            <Item>
              <Item.Image className='subsystem__image' size='tiny' src={codingIcon} />
              <Item.Content>
                <Item.Header as='a'>{Strings.seeTypeSkill}</Item.Header>
                <Item.Description>
                  {Strings.skillTypeInfo}
                  <br/>
                  <TypeSkill/>
                </Item.Description>
              </Item.Content>
            </Item></Item.Group></Segment>
        <Segment className='subsystem'>
          <Item.Group>
            <Item>
              <Item.Image className='subsystem__image' size='tiny' src={readingIcon} />
              <Item.Content>
                <Item.Header as='a'>{Strings.seeFastReadSkill}</Item.Header>
                <Item.Description>
                  {Strings.skillReadInfo}
                  <br/>
                  <FastReadButton/>
                </Item.Description>
              </Item.Content>
            </Item></Item.Group></Segment>
      </Grid.Row>
      <Grid.Row centered>
        <AnswerQuestionShower/>
      </Grid.Row>
      <Grid.Row>
      </Grid.Row>
    </Grid>
  }
}

export default SkillHome
