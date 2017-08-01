import React from 'react'

import { Button, Form, Icon, Image, Modal, Input, Comment } from 'semantic-ui-react'
import _ from 'lodash'
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
    return <Comment>
      {/*<Comment.Avatar as='a' src='/assets/images/avatar/small/christian.jpg' />*/}
      <Comment.Content>
        <Comment.Author>{comment.name}</Comment.Author>
        <Comment.Text>{comment.text}</Comment.Text>
      </Comment.Content>
    </Comment>
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
        }),
      })
        .then(response => response.json())
        .then(result => this.handleResult(result))
    }
  }
  handleResult(result){
    this.props.getInfoRecall()
  }
  render() {
    const comments = this.props.commnetList.map((comment) => this.renderComment(comment))
    return <div>
      <Comment.Group>
        {Strings.toursComment}
        {comments}
        <Form >
          {this.props.SubmitStatus !== 4 && <Form.TextArea value={this.state.userComment} placeholder={Strings.writeYourCommentTour} onChange={event => this.onuserCommentChange(event.target.value)}/>}
          {this.props.SubmitStatus !== 4 && <Button content={Strings.submit} onClick={() => this.sendComment()} primary />}
        </Form>
      </Comment.Group>
    </div>

  }
}

export default CommentShower
