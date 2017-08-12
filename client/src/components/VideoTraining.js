import React from 'react'
import { Link,Image, Modal, Button } from 'semantic-ui-react'
import Strings from '../localization'

import rahLogo from '../../asset/RAH_logo.png'
class VideoTraining extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  render() {
    const logo = <div className='app__header__training' color="red">
        <Button color="red">{Strings.training}</Button> 
    </div>

    // const logo_big = <video controls="controls">
    //   <source src="https://drive.google.com/uc?export=download&id=0B0JMGMGgxp9WMEdWb1hyQUhlOWs" type='video/mp4'/>
    // </video>
    // const logo = <Image className='app__header__column__logo' src={rahLogo} alt={'no Image load'}/>
    return <Modal closeIcon trigger={logo}>
      <Modal.Header>{Strings.rah}</Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description className='app__logo__modal'>
          {/*{logo_big}*/}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
      </Modal.Actions>
    </Modal>
  }
}

export default VideoTraining
