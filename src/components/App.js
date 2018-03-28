import React, { Component } from 'react';
import '../App.css';
import { withRouter, Route, Switch } from 'react-router-dom';
import propTypes from 'prop-types';
import NavigationBar from './NavigationBar';
import Category from './Category';
import ErrorPage from './ErrorPage';
import Post from './Post';
import { connect } from 'react-redux';
import { getCategories } from '../actions';

class App extends Component {
  componentDidMount () {
    this.props.getCategories();
  }

  render () {
    const categories = (() => {
      if (this.props.categories) {
        return this.props.categories;
      } else {
        return [];
      }
    });

    return (
      <div className='App'>
        <NavigationBar categories={categories()} />

        <Switch>
          <Route exact path='/' render={() => (
            <Category categoryName='all' categories={categories()} />
          )} />

          {categories().map((category) => (
            <Route exact path={`/${category}`} render={() => (
              <Category categoryName={category} categories={categories()} />
            )} key={category} />
          ))}

          {categories().map((category) => (
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
  return {
    categories: state.categories.categoriesArray
  };
};

App.propTypes = {
  categories: propTypes.array,
  getCategories: propTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, {getCategories})(App));
