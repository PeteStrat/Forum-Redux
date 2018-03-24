import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { voteComment, editComment, deleteComment } from '../actions';
import {
  Glyphicon,
  Modal,
  Button
} from 'react-bootstrap';
import EditCommentForm from './EditCommentForm';

class Comment extends Component {
  state = {
    isEditCommentModalOpen: false,
    isDeleteCommentModalOpen: false
  }

  toggleEditCommentModal = () => {
    this.setState(() => ({isEditCommentModalOpen: !this.state.isEditCommentModalOpen}));
  }

  toggleDeleteCommentModal = () => {
    this.setState(() => ({isDeleteCommentModalOpen: !this.state.isDeleteCommentModalOpen}));
  }

  render () {
    if (!this.props.commentData) {
      return (<div> Rendering </div>);
    } else {
      let { author, body, timestamp, voteScore, id } = this.props.commentData;
      let dateObject = new Date(timestamp);
      let day = dateObject.getDate().toString();
      let month = (dateObject.getMonth() + 1).toString();
      let year = dateObject.getFullYear().toString();
      let { voteComment } = this.props;
      let { isEditCommentModalOpen, isDeleteCommentModalOpen } = this.state;

      return (
        <div>
          <h4> {body} </h4>

          <h5> written by {author} on {month}/{day}/{year} </h5>
          <h5>
            Post Rating: {voteScore}
            <Glyphicon
              className='voteButton'
              glyph='thumbs-up'
              onClick={() => voteComment(id, 'upVote')}
            />
            <Glyphicon
              className='voteButton'
              glyph='thumbs-down'
              onClick={() => voteComment(id, 'downVote')}
            />
            <Glyphicon
              className='editButton'
              glyph='edit'
              onClick={() => this.toggleEditCommentModal()}
            />

            <Glyphicon
              className='deleteButton'
              glyph='remove-circle'
              onClick={() => this.toggleDeleteCommentModal()}
            />
          </h5>

          <Modal
            bsSize='large'
            show={isEditCommentModalOpen}
            onHide={this.toggleEditCommentModal}
          >
            <Modal.Header closeButton>
              <Modal.Title id='contained-modal-title-lg'>Edit Comment</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <EditCommentForm
                close={this.toggleEditCommentModal}
                commentId={id}
                body={body}
              />
            </Modal.Body>
          </Modal>

          <Modal
            show={isDeleteCommentModalOpen}
            onHide={this.toggleDeleteCommentModal}
          >
            <Modal.Header>
              <Modal.Title>Delete Comment</Modal.Title>
            </Modal.Header>

            <Modal.Body>Are You Sure You Want To Delete This?</Modal.Body>

            <Modal.Footer>
              <Button onClick={() => { this.toggleDeleteCommentModal(); }}>Nevermind</Button>
              <Button bsStyle='danger' onClick={() => { this.props.deleteComment(id); }}>Delete Comment</Button>
            </Modal.Footer>
          </Modal>

        </div>
      );
    }
  }
}

Comment.propTypes = {
  commentData: propTypes.object.isRequired,
  voteComment: propTypes.func.isRequired,
  deleteComment: propTypes.func.isRequired
};

let mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { voteComment, editComment, deleteComment })(Comment);
