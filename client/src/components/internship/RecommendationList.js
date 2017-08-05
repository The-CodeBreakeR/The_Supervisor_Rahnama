/**
 * Created by ali on 7/31/17.
 */

import React from 'react'
import { List, Modal, Button } from 'semantic-ui-react'
import Strings from '../../localization'
import MomentJ from 'moment-jalaali'
import Cookie from 'browser-cookies'

class RecommendationList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recommendationsList: [],
      open: false,
    }
  }

  close() {
    this.setState({open: false})
  }

  ButtonClickHandle() {
    fetch('/api/internship_recommendation/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        this.setState({recommendationsList: result})
      })
  }

  renderRecommendation(recommendation) {
    return <List.Item key={recommendation.id} >
      {recommendation.description}
    </List.Item>
  }

  render() {
    const recommendations = this.state.recommendationsList.map((recommendation) => this.renderRecommendation(recommendation))
    return <Modal trigger={<Button className='internship__mainbutton'
      size='massive' color='blue' onClick={() => this.ButtonClickHandle()}>{Strings.internRecommendations}</Button>}
    open={this.state.open}
    onOpen={() => this.setState({open: true})}
    >
      <Modal.Header>{Strings.internRecommendations}</Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description>
          <List bulleted>
            {recommendations}
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

export default RecommendationList
