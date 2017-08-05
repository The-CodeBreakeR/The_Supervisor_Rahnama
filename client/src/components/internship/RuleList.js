import React from 'react'
import { List, Modal, Button } from 'semantic-ui-react'
import Strings from '../../localization'
import MomentJ from 'moment-jalaali'
import Cookie from 'browser-cookies'

class RuleList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rulesList: [],
      open: false,
    }
  }

  close() {
    this.setState({open: false})
  }

  ButtonClickHandle() {
    fetch('/api/internship_rule/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        this.setState({rulesList: result})
      })
  }

  renderRule(rule) {
    return <List.Item key={rule.id} >
      {rule.description}
    </List.Item>
  }

  render() {
    const rules = this.state.rulesList.map((rule) => this.renderRule(rule))
    return <Modal trigger={<Button className='internship__mainbutton'
      size='massive' color='green' onClick={() => this.ButtonClickHandle()}>{Strings.internRules}</Button>}
    open={this.state.open}
    onOpen={() => this.setState({open: true})}
    >
      <Modal.Header>{Strings.internRules}</Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description>
          <List bulleted>
            {rules}
          </List>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => this.close()}>
          {Strings.internCloseModal}
        </Button>
      </Modal.Actions>
    </Modal>
  }
}

export default RuleList
