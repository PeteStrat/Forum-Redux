import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import propTypes from 'prop-types';

class NavigationBar extends Component {
  render () {
    let categories = this.props.categories;

    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'> Home </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {
              categories.map((category) => (
                <LinkContainer to={`/${category}`} key={category}>
                  <NavItem > {category} </NavItem>
                </LinkContainer>
              ))
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

NavigationBar.propTypes = {
  categories: propTypes.arrayOf(propTypes.string).isRequired
};

export default NavigationBar;
