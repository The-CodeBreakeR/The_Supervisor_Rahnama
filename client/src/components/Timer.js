/**
 * Created by root on 8/25/17.
 */
import React from 'react'
import { ApAnalogClock, ApAnalogClockStyle } from 'apeman-react-clock'
import MomentJ from 'moment-jalaali'
import AnalogClock, { Themes } from 'react-analog-clock'

class Timer extends React.Component {

  componentWillUnmount () {
    clearInterval(this.timerRef)
  }

  render () {

    return <div className="time__box">
      <div className="clock__box middle">
        <div className="middle">{MomentJ().format(' HH:mm:ss')}</div>
      </div>
      <div className="date__box middle">
        <div >{MomentJ().format('LL')}</div>
      </div>
    </div>
  }
}

export default Timer
