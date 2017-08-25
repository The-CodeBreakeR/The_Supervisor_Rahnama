import React from 'react'
import CodingSkillButton from './CodingSkillButton'
import PresentationButton from './PresentationButton'
import FastReadButton from './FastReadButton'
import { Grid } from 'semantic-ui-react'
import TypeSkill from './TypeSkill'
import SkillGuide from './SkillGuide'

import AnswerQuestionShower from './AnswerQuestionShower'

class SkillHome extends React.Component {
  render() {
    return <Grid centered>
      <Grid.Row columns={2}>
        <CodingSkillButton/>
        <PresentationButton/>
      </Grid.Row>
      <Grid.Row centered>
        <SkillGuide/>
      </Grid.Row>
      <Grid.Row columns={2}>
        <TypeSkill/>
        <FastReadButton/>
      </Grid.Row>
      <Grid.Row centered>
        <AnswerQuestionShower/>
      </Grid.Row>
    </Grid>
  }
}

export default SkillHome
