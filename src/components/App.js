import React, { Component } from 'react';
// import logo from '../logo.svg';
import '../App.css';
import axios from 'axios';
import { withRouter, Route, Switch } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Category from './Category';
import ErrorPage from './ErrorPage';
import Post from './Post';

class App extends Component {
  state = {
    categories: []
  }

  componentDidMount () {
    const url = 'http://localhost:3001/categories';
    axios.get(url, {
      headers: { 'Authorization': '123' }
    })
      .then((response) => {
        let categoryNames = response.data.categories.map(category => category.name);
        this.setState({categories: categoryNames});
      });
  }

  render () {
    let categories = this.state.categories;

    return (
      <div className='App'>
        <NavigationBar categories={this.state.categories} />

        <Switch>
          <Route exact path='/' render={() => (
            <Category categoryName='all' categories={this.state.categories} />
          )} />

          {categories.map((category) => (
            <Route exact path={`/category/${category}`} render={() => (
              <Category categoryName={category} categories={this.state.categories} />
            )} key={category} />
          ))}

          <Route path='/post/:id' render={(props) => (
            <Post id={props.match.params.id} />
          )} />

          <Route component={ErrorPage} />
        </Switch>

      </div>
    );
  }
}

export default withRouter(App);
