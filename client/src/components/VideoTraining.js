import React from 'react'
import { Link,Image, Modal, Button } from 'semantic-ui-react'
import Strings from '../localization'
// import 'node_modules/video-react/dist/video-react.css'
// import movie from '../../asset/movie.mp4'
import movie from '../../asset/RAH_logo.png'
// import { Player } from 'video-react';
class VideoTraining extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  render(){
    const logo = <div className='app__header__training' color="red">
        <Button color="red">{Strings.training}</Button>
    </div>

    const logo_big = <video className='app__header__video' controls="controls">
      <source src={movie} type='video/mp4'/>
    </video>
    // const logo_big = <Player
    //   playsInline
    //   src={movie}
    // />
    // const logo = <Image className='app__header__column__logo' src={rahLogo} alt={'no Image load'}/>
    return <Modal closeIcon trigger={logo}>
      <Modal.Header>{Strings.titleTrain}</Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description className='app__logo__modal'>
          {logo_big}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
      </Modal.Actions>
    </Modal>
  }
}

export default VideoTraining
