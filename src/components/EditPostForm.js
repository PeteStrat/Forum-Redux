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
import { editPost } from '../actions';

class EditPostForm extends Component {
  state = {
    title: this.props.title,
    body: this.props.body
  }

  handleTitleChange = (event) => {
    this.setState({title: event.target.value});
  }

  handleBodyChange = (event) => {
    this.setState({body: event.target.value});
  }

  handleSubmit = (event) => {
    this.setState({
      id: this.props.postId
    }, () => {
      let { id, title, body } = this.state;
      this.props.editPost(id, title, body);
    });

    event.preventDefault();
    this.props.close();
  }

  render () {
    let { body, title } = this.props;

    return (
      <div>
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup>
            <Col sm={2}> Title </Col>
            <Col sm={10}>
              <FormControl
                type='text'
                defaultValue={title}
                onChange={this.handleTitleChange}
                title={this.state.title}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={2}> Post Content </Col>
            <Col sm={10}>
              <FormControl
                componentClass='textarea'
                type='text'
                defaultValue={body}
                onChange={this.handleBodyChange}
                body={this.state.body}
                rows={10}
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

EditPostForm.propTypes = {
  close: propTypes.func.isRequired,
  editPost: propTypes.func.isRequired,
  postId: propTypes.string.isRequired,
  body: propTypes.string.isRequired,
  title: propTypes.string.isRequired
};

let mapStateToProps = (state) => {
  return {state};
};

export default connect(mapStateToProps, {editPost})(EditPostForm);
