import React from 'react'
import MomentJ from 'moment-jalaali'

class Timer extends React.Component {
  render() {
    return <div className='time__box'>
      <div className='clock__box middle'>
        <div className='middle'>{MomentJ().format(' HH:mm:ss')}</div>
      </div>
      <div className='date__box middle'>
        <div >{MomentJ().format('LL')}</div>
      </div>
    </div>
  }
}

export default Timer
