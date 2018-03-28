import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
  Form,
  FormGroup,
  FormControl,
  Col,
  Button
} from 'react-bootstrap';
import generateId from '../utils/GenerateId';
import { createComment } from '../actions/commentActions';

class NewCommentForm extends Component {
  state = {
    id: '',
    parentId: '',
    author: '',
    body: '',
    timestamp: null,
    voteScore: 1,
    deleted: false
  }

  handleAuthorchange = (event) => {
    this.setState({author: event.target.value});
  }

  handleBodyChange = (event) => {
    this.setState({body: event.target.value});
  }

  handleSubmit = (event) => {
    this.setState({
      timestamp: Date.now(),
      id: generateId(),
      parentId: this.props.postid
    }, () => {
      this.props.createComment(this.state);
    });

    event.preventDefault();
    this.props.close();
  }

  render () {
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormGroup>
          <Col sm={2}> Author </Col>
          <Col sm={10}>
            <FormControl
              type='text'
              placeholder='Enter Your Name'
              onChange={this.handleAuthorchange}
              author={this.state.author}
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col sm={2}> Comment Content </Col>
          <Col sm={10}>
            <FormControl
              componentClass='textarea'
              type='text'
              placeholder='Enter Your comment Here'
              onChange={this.handleBodyChange}
              body={this.state.body}
              rows={5}
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type='submit'>Submit Comment</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

NewCommentForm.propTypes = {
  close: propTypes.func.isRequired,
  postid: propTypes.string.isRequired,
  createComment: propTypes.func.isRequired
};

let mapStateToProps = (state) => {
  return {state};
};

export default connect(mapStateToProps, {createComment})(NewCommentForm);
