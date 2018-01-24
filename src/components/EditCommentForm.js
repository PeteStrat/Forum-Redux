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
import { editComment } from '../actions/index';

class EditCommentForm extends Component {
  state = {
    body: this.props.body,
    id: this.props.commentId
  }

  handleBodyChange = (event) => {
    this.setState({body: event.target.value});
  }

  handleSubmit = (event) => {
    this.setState({
      timestamp: Date.now()
    }, () => {
      let { id, body, timestamp } = this.state;
      this.props.editComment(id, body, timestamp);
    });

    event.preventDefault();
    this.props.close();
  }

  render () {
    let { body } = this.props;

    return (
      <div>
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup>
            <Col sm={2}> Edit Comment </Col>
            <Col sm={10}>
              <FormControl
                type='textarea'
                rows={3}
                defaultValue={body}
                onChange={this.handleBodyChange}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type='submit'>Submit Post</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

EditCommentForm.propTypes = {
  close: propTypes.func.isRequired,
  editComment: propTypes.func.isRequired,
  commentId: propTypes.string.isRequired,
  body: propTypes.string.isRequired
};

let mapStateToProps = (state) => {
  return {state};
};

export default connect(mapStateToProps, {editComment})(EditCommentForm);
