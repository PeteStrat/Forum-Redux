import React, { Component } from 'react';
// import logo from '../logo.svg';
import '../App.css';
import axios from 'axios';
import { withRouter, Route, Switch } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Category from './Category';
import ErrorPage from './ErrorPage';
import Post from './Post';
import { connect } from 'react-redux';
import { getCategories } from '../actions';

class App extends Component {
  state = {
    categories: []
  }

  componentDidMount () {
    this.props.getCategories();
    // this.setState((prevState) => {
    //   // this.props.getCategories
    //   return this.props.getCategories;
    // });
    // const url = 'http://localhost:3001/categories';
    // axios.get(url, {
    //   headers: { 'Authorization': '123' }
    // })
    //   .then((response) => {
    //     let categoryNames = response.data.categories.map(category => category.name);
    //     this.setState({categories: categoryNames});
    //   });
  }

  render () {
    let categories = this.state.categories;
    // console.log(this.state);
    // console.log(this.props);
    return (
      <div className='App'>
        <NavigationBar categories={this.state.categories} />

        <Switch>
          <Route exact path='/' render={() => (
            <Category categoryName='all' categories={this.state.categories} />
          )} />

          {categories.map((category) => (
            <Route exact path={`/${category}`} render={() => (
              <Category categoryName={category} categories={this.state.categories} />
            )} key={category} />
          ))}

          {categories.map((category) => (
            <Route exact path={`/${category}/:id`} render={(props) => (
              <Post id={props.match.params.id} />
            )} key={category} />
          ))}

          <Route component={ErrorPage} />
        </Switch>

      </div>
    );
  }
}

let mapStateToProps = (state) => {
  console.log(state);
  return {
    test: 'testing state'
  };
};

export default connect(mapStateToProps, {getCategories})(withRouter(App));
