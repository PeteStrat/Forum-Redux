import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost, votePost, deletePost } from '../actions/postActions';
import { getPostComments } from '../actions/commentActions';
import Comment from './Comment';
import NewCommentForm from './NewCommentForm';
import FaPlusCircle from 'react-icons/lib/fa/plus-circle';
import { Redirect } from 'react-router-dom';
import { Jumbotron,
  ListGroup,
  ListGroupItem,
  Glyphicon,
  Modal,
  Button
} from 'react-bootstrap';
import EditPostForm from './EditPostForm';

class Post extends Component {
  state = {
    newCommentModalOpen: false,
    isEditPostModalOpen: false,
    isDeletePostModalOpen: false,
    deleted: false
  }
  componentDidMount () {
    this.props.getPost(this.props.id);
    this.props.getPostComments(this.props.id);
  }

  toggleNewCommentModal = () => {
    this.setState(() => ({newCommentModalOpen: !this.state.newCommentModalOpen}));
  }

  toggleEditPostModal = () => {
    this.setState(() => ({isEditPostModalOpen: !this.state.isEditPostModalOpen}));
  }

  toggleDeletePostModal = () => {
    this.setState(() => ({isDeletePostModalOpen: !this.state.isDeletePostModalOpen}));
  }

  handleDelete = () => {
    this.setState(() => ({deleted: true}));
    this.props.deletePost(this.props.id);
    this.toggleDeletePostModal();
  }
  render () {
    let commentsArray = this.props.comments;

    if (!this.props.post) {
      return (<div> Rendering </div>);
    } else if (!this.props.post.id) {
      return (<Redirect to='/' />);
    } else {
      let { author, body, timestamp, title, voteScore, id } = this.props.post;
      let dateObject = new Date(timestamp);
      let day = dateObject.getDate().toString();
      let month = dateObject.getMonth().toString();
      let year = dateObject.getFullYear().toString();
      let { votePost } = this.props;
      let { newCommentModalOpen, isEditPostModalOpen, isDeletePostModalOpen } = this.state;

      return (
        <div>
          <div className='indvidiaul-post'>
            <h1> {title} </h1>
            <h4> Written By: {author} on {day}/{month}/{year} </h4>
            <h4>
              <div> Post Rating: {voteScore} </div>
              <div> Comment Count: {commentsArray.length} </div>
              <Glyphicon
                className='voteButton'
                glyph='thumbs-up'
                onClick={() => votePost(id, 'upVote')}
              />
              <Glyphicon
                className='voteButton'
                glyph='thumbs-down'
                onClick={() => votePost(id, 'downVote')}
              />
              <Glyphicon
                className='editButton'
                glyph='edit'
                onClick={() => this.toggleEditPostModal()}
              />

              <Glyphicon
                className='deleteButton'
                glyph='remove-circle'
                onClick={() => this.toggleDeletePostModal()}
              />

            </h4>
            <Jumbotron>
              {body}
            </Jumbotron>
            <div>
              <ListGroup>
                {
                  commentsArray.map((comment) => (
                    <ListGroupItem key={comment.id}>
                      <Comment commentData={comment} />
                    </ListGroupItem>
                  ))
                }
                <Modal
                  bsSize='large'
                  show={newCommentModalOpen}
                  onHide={this.toggleNewCommentModal}
                >
                  <Modal.Header closeButton>
                    <Modal.Title id='contained-modal-title-lg'>Add A Comment</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <NewCommentForm
                      close={this.toggleNewCommentModal}
                      postid={id}
                    />
                  </Modal.Body>
                </Modal>

                <Modal
                  bsSize='large'
                  show={isEditPostModalOpen}
                  onHide={this.toggleEditPostModal}
                >
                  <Modal.Header closeButton>
                    <Modal.Title id='contained-modal-title-lg'>Edit Post</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <EditPostForm
                      close={this.toggleEditPostModal}
                      postId={id}
                      body={body}
                      title={title}
                    />
                  </Modal.Body>
                </Modal>
                <Modal
                  show={isDeletePostModalOpen}
                  onHide={this.toggleDeletePostModal}
                >
                  <Modal.Header>
                    <Modal.Title>Delete Post</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>Are You Sure You Want To Delete This?</Modal.Body>

                  <Modal.Footer>
                    <Button onClick={() => { this.toggleDeletePostModal(); }}>Nevermind</Button>
                    <Button bsStyle='danger' onClick={() => { this.handleDelete(); }}> Delete Post </Button>
                  </Modal.Footer>
                </Modal>

              </ListGroup>
            </div>
            <div className='add-comment'>
              <FaPlusCircle className='add-comment-link'size={50} onClick={this.toggleNewCommentModal} />
            </div>
          </div>
        </div>
      );
    }
  }
}

Post.propTypes = {
  getPost: propTypes.func.isRequired,
  getPostComments: propTypes.func.isRequired,
  id: propTypes.string.isRequired,
  post: propTypes.object,
  comments: propTypes.arrayOf(propTypes.object),
  votePost: propTypes.func.isRequired,
  deletePost: propTypes.func.isRequired
};

let mapStateToProps = (state) => {
  return {
    post: state.posts.currentPost,
    comments: state.comments.commentsArray
  };
};

export default connect(mapStateToProps, {getPost, getPostComments, votePost, deletePost})(Post);
