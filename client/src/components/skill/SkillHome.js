import React from 'react'
import CodingSkillButton from './CodingSkillButton'
import PresentationButton from './PresentationButton'
import FastReadButton from './FastReadButton'
import TypeSkill from './TypeSkill'


class SkillHome extends React.Component {

  render() {
    return <div><CodingSkillButton/>
      <PresentationButton/>
      <FastReadButton/>
      <TypeSkill/>
    </div>
  }
}

export default SkillHome
