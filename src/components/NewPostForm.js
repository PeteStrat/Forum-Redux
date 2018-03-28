import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
  Form,
  FormGroup,
  FormControl,
  Col,
  Button,
  ControlLabel
} from 'react-bootstrap';
import generateId from '../utils/GenerateId';
import { createNewPost } from '../actions/postActions';

class NewPostForm extends Component {
  state = {
    id: '',
    title: '',
    author: '',
    body: '',
    timestamp: null,
    voteScore: 1,
    commentCount: 0,
    category: 'redux',
    deleted: false
  }

  handleTitleChange = (event) => {
    this.setState({title: event.target.value});
  }

  handleAuthorchange = (event) => {
    this.setState({author: event.target.value});
  }

  handleBodyChange = (event) => {
    this.setState({body: event.target.value});
  }
  handleCategoryChange = (event) => {
    this.setState({category: event.target.value});
  }

  handleSubmit = (event) => {
    this.setState({
      timestamp: Date.now(),
      id: generateId()
    }, () => {
      this.props.createNewPost(this.state);
    });

    event.preventDefault();
    this.props.close();
  }

  render () {
    let { categories } = this.props;

    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormGroup >
          <Col sm={2}>
            <ControlLabel>Select Category</ControlLabel>
          </Col>
          <Col sm={10}>
            <FormControl componentClass='select' placeholder='select' value={this.state.category} onChange={this.handleCategoryChange}>
              {categories.map((category) => (
                <option value={`${category}`} key={category}> {category} </option>
              ))}
            </FormControl>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col sm={2}> Author </Col>
          <Col sm={10}>
            <FormControl
              type='text'
              placeholder='Enter Your Name'
              onChange={this.handleTitleChange}
              title={this.state.title}
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col sm={2}> Title </Col>
          <Col sm={10}>
            <FormControl
              type='text'
              placeholder='Enter A Post Title'
              onChange={this.handleAuthorchange}
              author={this.state.author}
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col sm={2}> Post Content </Col>
          <Col sm={10}>
            <FormControl
              componentClass='textarea'
              type='text'
              placeholder='Enter Your Post Here'
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
    );
  }
}

NewPostForm.propTypes = {
  close: propTypes.func.isRequired,
  categories: propTypes.array.isRequired,
  createNewPost: propTypes.func.isRequired
};

function mapStatetoProps (state) {
  return {state};
}

export default connect(mapStatetoProps, {createNewPost})(NewPostForm);
