import React from 'react'
import CodingTimingButton from './CodingTimingButton'
import PresentationButton from './PresentationButton'
import FastReadButton from './FastReadButton'
import TypeTiming from './TypeTiming'
import SubmitQuestionButton from './SubmitQuestionButton'

class TimingHome extends React.Component {

  render() {
    return <div><CodingTimingButton/>
      <PresentationButton/>
      <FastReadButton/>
      <TypeTiming/>
      <SubmitQuestionButton/>
    </div>
  }
}

export default TimingHome
