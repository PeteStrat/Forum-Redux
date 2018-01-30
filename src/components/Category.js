import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllPosts, votePost, deletePost } from '../actions';
import { Link } from 'react-router-dom';
import FaPlusCircle from 'react-icons/lib/fa/plus-circle';
import NewPostForm from './NewPostForm';
import { Table,
  Glyphicon,
  Modal,
  Button
} from 'react-bootstrap';
import EditPostForm from './EditPostForm';

class Category extends Component {
  state = {
    sorted: false,
    sortDirection: null,
    sortedPosts: [],
    isNewPostModalOpen: false,
    isEditPostModalOpen: false,
    isDeletePostModalOpen: false,
    postToModify: {}
  }

  toggleNewPostModal = () => {
    (this.state.isNewPostModalOpen === true)
      ? this.setState(() => ({isNewPostModalOpen: false}))
      : this.setState(() => ({isNewPostModalOpen: true}));
  }

  toggleEditPostModal = (post) => {
    if (this.state.isEditPostModalOpen === true) {
      this.setState(() => ({isEditPostModalOpen: false}));
    } else {
      console.log(post);
      this.setState(() => ({
        isEditPostModalOpen: true,
        postToModify: post
      }));
    }
  }

  toggleDeletePostModal = (postId) => {
    (this.state.isDeletePostModalOpen === true)
      ? this.setState(() => ({isDeletePostModalOpen: false}))
      : this.setState(() => ({isDeletePostModalOpen: true}));
  }

  componentDidMount () {
    this.props.getAllPosts(this.props.categoryName);
  }

  sortPosts = (sortBy) => {
    let { sortDirection } = this.state;
    let posts;

    if (sortBy === 'date') {
      if (sortDirection === null || sortDirection === 'ASC') {
        // Sort by date descending
        this.setState((currentState, props) => {
          currentState.sorted = true;
          currentState.sortDirection = 'DESC';

          posts = props.posts.sort((post1, post2) => {
            return post1.timestamp - post2.timestamp;
          });

          currentState.sortedPosts = posts;
          return currentState;
        });
      } else {
        // sort by date ascending
        this.setState((currentState, props) => {
          currentState.sorted = true;
          currentState.sortDirection = 'ASC';

          posts = props.posts.sort((post1, post2) => {
            return post2.timestamp - post1.timestamp;
          });

          currentState.sortedPosts = posts;
          return currentState;
        });
      }
    } else if (sortBy === 'voteScore') {
      if (sortDirection === null || sortDirection === 'ASC') {
        // Sort by voteScore descending
        this.setState((currentState, props) => {
          currentState.sorted = true;
          currentState.sortDirection = 'DESC';
          posts = props.posts.sort((post1, post2) => {
            return post1.voteScore - post2.voteScore;
          });

          currentState.sortedPosts = posts;
          return currentState;
        });
      } else {
        // sort by voteScore ascending
        this.setState((currentState, props) => {
          currentState.sorted = true;
          currentState.sortDirection = 'ASC';
          posts = props.posts.sort((post1, post2) => {
            return post2.voteScore - post1.voteScore;
          });

          currentState.sortedPosts = posts;
          return currentState;
        });
      }
    }
  }

  handleDelete = () => {
    this.props.deletePost(this.props.id);
    this.setState(() => ({deleted: true}));
    this.toggleDeletePostModal();
  }

  render () {
    let categoryTitle = this.props.categoryName;
    let { isNewPostModalOpen, isEditPostModalOpen, isDeletePostModalOpen } = this.state;
    let posts;
    let { votePost } = this.props;
    // If posts are Unsorted, get posts array from Props, otherwise from State
    (this.state.sorted === true)
      ? posts = this.state.sortedPosts
      : posts = this.props.posts;

    categoryTitle === 'all'
      ? categoryTitle = 'All Posts'
      : categoryTitle = `Posts About ${categoryTitle}`;

    return (
      <div className='post-container'>
        <h1 className='category-title'> {categoryTitle} </h1>

        <Table striped bordered condensed hover>
          <tbody>
            <tr>
              <th> Post Title</th>
              <th> Category </th>
              <th> Author</th>
              <th> Comment Count </th>
              <th> Vote Score <Glyphicon className='sort-button' glyph='sort' onClick={() => { this.sortPosts('voteScore'); }} /> </th>
              <th> Date Posted <Glyphicon className='sort-button' glyph='sort' onClick={() => { this.sortPosts('date'); }} /> </th>
            </tr>
            {
              posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <Link to={`/post/${post.id}`}> {post.title} </Link>
                    <Glyphicon
                      className='editButton'
                      glyph='edit'
                      onClick={() => this.toggleEditPostModal(post)}
                    />
                    <Glyphicon
                      className='deleteButton'
                      glyph='remove-circle'
                      onClick={() => this.toggleDeletePostModal()}
                    />
                  </td>
                  <td> {post.category} </td>
                  <td> {post.author} </td>
                  <td> {post.commentCount} </td>
                  <td>
                    {post.voteScore}
                    <Glyphicon
                      className='voteButton'
                      glyph='thumbs-up'
                      onClick={() => votePost(post.id, 'upVote')}
                    />
                    <Glyphicon
                      className='voteButton'
                      glyph='thumbs-down'
                      onClick={() => votePost(post.id, 'downVote')}
                    />
                  </td>
                  <td>
                    {(new Date(post.timestamp).getMonth() + 1).toString()}/
                    {new Date(post.timestamp).getDate().toString()}/
                    {new Date(post.timestamp).getUTCFullYear().toString()}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
        <Modal
          bsSize='large'
          show={isNewPostModalOpen}
          onHide={this.toggleNewPostModal}
        >
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-lg'>Create A Post</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <NewPostForm
              close={this.toggleNewPostModal}
              categories={this.props.categories}
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
              postId={this.state.postToModify.id}
              body={this.state.postToModify.body}
              title={this.state.postToModify.title}
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

        <div className='add-post'>
          <FaPlusCircle className='add-post-link'size={50} onClick={this.toggleNewPostModal} />
        </div>

      </div>
    );
  }
}

Category.propTypes = {
  categoryName: propTypes.string.isRequired,
  getAllPosts: propTypes.func.isRequired,
  posts: propTypes.arrayOf(propTypes.object),
  categories: propTypes.arrayOf(propTypes.string),
  votePost: propTypes.func.isRequired,
  deletePost: propTypes.func.isRequired
};

function mapStateToProps (state) {
  return { posts: state.posts.postsArray };
}

export default connect(mapStateToProps, {getAllPosts, votePost, deletePost})(Category);
