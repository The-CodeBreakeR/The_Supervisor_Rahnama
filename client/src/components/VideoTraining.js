import React from 'react'
import { Link,Image, Modal, Button } from 'semantic-ui-react'
import Strings from '../localization'
import movie from '../../asset/RAH_logo.png'

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
