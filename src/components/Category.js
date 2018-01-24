import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllPosts } from '../actions';
import { Link } from 'react-router-dom';
import FaPlusCircle from 'react-icons/lib/fa/plus-circle';
import NewPostForm from './NewPostForm';
import { Table,
  Glyphicon,
  Modal
} from 'react-bootstrap';

class Category extends Component {
  state = {
    sorted: false,
    sortDirection: null,
    sortedPosts: [],
    isNewPostModalOpen: false
  }
  openNewPostModal = () => {
    this.setState(() => ({
      isNewPostModalOpen: true
    }));
  }

  closeNewPostModal = () => {
    this.setState(() => ({
      isNewPostModalOpen: false
    }));
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

  render () {
    let categoryTitle = this.props.categoryName;
    let { isNewPostModalOpen } = this.state;
    let posts;

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
              <th> Vote Score <Glyphicon className='sort-button' glyph='sort' onClick={() => { this.sortPosts('voteScore'); }} /> </th>
              <th> Date Posted <Glyphicon className='sort-button' glyph='sort' onClick={() => { this.sortPosts('date'); }} /> </th>
            </tr>
            {
              posts.map((post) => (
                <tr key={post.id}>
                  <td> <Link to={`/post/${post.id}`}> {post.title} </Link> </td>
                  <td> {post.category} </td>
                  <td> {post.author} </td>
                  <td> {post.voteScore} </td>
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
          onHide={this.closeNewPostModal}
        >
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-lg'>Create A Post</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <NewPostForm
              close={this.closeNewPostModal}
              categories={this.props.categories}
            />
          </Modal.Body>
        </Modal>

        <div className='add-post'>
          <FaPlusCircle className='add-post-link'size={50} onClick={this.openNewPostModal} />
        </div>

      </div>
    );
  }
}

Category.propTypes = {
  categoryName: propTypes.string.isRequired,
  getAllPosts: propTypes.func.isRequired,
  posts: propTypes.arrayOf(propTypes.object),
  categories: propTypes.arrayOf(propTypes.string)
};

function mapStateToProps (state) {
  return { posts: state.posts.postsArray };
}

export default connect(mapStateToProps, {getAllPosts})(Category);
