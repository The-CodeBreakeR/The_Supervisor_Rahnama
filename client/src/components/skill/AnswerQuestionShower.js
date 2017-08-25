import React from 'react'
import { Message, Button, Modal, Segment } from 'semantic-ui-react'
import Strings from '../../localization'
import Cookie from 'browser-cookies'

class AnswerQuestionShower extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      QuestionAndAnswer: [],
      status: 1,
    }
  }
  close() {
    this.setState({open: false})
  }
  handleResult(result) {
    this.setState({ open: true })
    this.setState({QuestionAndAnswer: result.questions})
    this.setState({status: result.status})
  }
  sendRequest() {
    if (Cookie.get('token')) {
      fetch('/skill/getQuestion/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: JSON.parse(localStorage.getItem('user')).token,
        }),
      })
        .then(response => response.json())
        .then(result => this.handleResult(result))
    }
  }
  renderAnswer(item) {
    return <Segment>
      <p>{Strings.questionShow}</p><p>{item.question}</p>
      <p>{Strings.answerShow}</p><p>{item.answer}</p>
    </Segment>
  }
  render() {
    const Answer = this.state.QuestionAndAnswer.map((answer) => this.renderAnswer(answer))
    return <Modal
      closeIcon
      open={this.state.open}
      onOpen={() => this.setState({open: true})}
      onClose={() => this.setState({open: false})} trigger={<Button onClick={() => this.sendRequest()}
        size='massive' color='green' >{Strings.answerAndQuestionArchive}</Button>}
    >
      <Modal.Header>{Strings.answerAndQuestionArchive}</Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description>
          {(this.state.status === 0) && Answer}
          {(this.state.status === 1) && <Message ><Message.Header>{Strings.noQuestion}</Message.Header>
          </Message>}
          {!(Cookie.get('token')) && <Message negative><Message.Header>{Strings.haveNotRegister}</Message.Header>
          </Message>}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => this.close()} >{Strings.tourStop}</Button>
      </Modal.Actions>
    </Modal>
  }
}

export default AnswerQuestionShower
