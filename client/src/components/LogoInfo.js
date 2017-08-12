import React from 'react'
import { Link, Image, Modal } from 'semantic-ui-react'
import Strings from '../localization'
import rahLogo from '../../asset/RAH_logo.png'

class LogoInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  render() {
    const logo = <Image className='app__header__column__logo' src={rahLogo} alt={'no Image load'} />
    const logo_big = <Image className='app__header__logo__big' src={rahLogo} alt={'no Image load'} />
    return <Modal closeIcon trigger={logo}>
      <Modal.Header>{Strings.rah}</Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description className='app__logo__modal'>
          {logo_big}
          <p>{Strings.powered}</p>
          <a href="http://www.rahemohandesi.persianblog.ir">{Strings.rah}</a>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
      </Modal.Actions>
    </Modal>
  }
}

export default LogoInfo
