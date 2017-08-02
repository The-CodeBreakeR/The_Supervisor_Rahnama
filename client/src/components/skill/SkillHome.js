import React from 'react'
import CodingSkillButton from './CodingSkillButton'
import PresentationButton from './PresentationButton'
import FastReadButton from './FastReadButton'
import TypeSkill from './TypeSkill'
import SubmitQuestionButton from './SubmitQuestionButton'
import AnswerQuestionShower from './AnswerQuestionShower'

class SkillHome extends React.Component {

  render() {
    return <div><CodingSkillButton/>
      <PresentationButton/>
      <FastReadButton/>
      <TypeSkill/>
      <SubmitQuestionButton/>
      <AnswerQuestionShower/>
    </div>
  }
}

export default SkillHome
