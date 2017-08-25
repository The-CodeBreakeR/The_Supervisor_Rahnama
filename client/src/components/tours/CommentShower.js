import React from 'react'

import { Button, Form, Comment, Segment } from 'semantic-ui-react'
import Strings from '../../localization'
import Cookie from 'browser-cookies'

class CommentShower extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      commentList: [],
      userComment: '',
    }
  }

  renderComment(comment) {
    return <Segment>
      <Comment>
        <Comment.Content>
          <Comment.Author>{Strings.name}: {comment.name}</Comment.Author>
          <Comment.Text>{Strings.commentText}: {comment.text}</Comment.Text>
        </Comment.Content>
      </Comment>
    </Segment>
  }
  onuserCommentChange(value) {
    this.setState({userComment: value})
  }
  sendComment() {
    if (Cookie.get('token')) {
      fetch('/tours/comment/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: JSON.parse(localStorage.getItem('user')).token,
          comment: this.state.userComment,
          tourId: this.props.tourId,
        }),
      })
        .then(response => response.json())
        .then(result => this.handleResult(result))
    }
  }
  handleResult(result) {
    this.props.getInfoRecall()
    this.setState({userComment: ''})
  }
  render() {
    const comments = this.props.commnetList.map((comment) => this.renderComment(comment))
    return <div>
      <Comment.Group className='tour__info__comments'>
        <Segment>{Strings.toursComment}
          {comments}
          <Form >
            {this.props.SubmitStatus !== 4 && <Form.TextArea value={this.state.userComment} placeholder={Strings.writeYourCommentTour} onChange={event => this.onuserCommentChange(event.target.value)}/>}
            {this.props.SubmitStatus !== 4 && <Button content={Strings.submit} onClick={() => this.sendComment()} primary />}
          </Form>
        </Segment>
      </Comment.Group>
    </div>
  }
}

export default CommentShower
