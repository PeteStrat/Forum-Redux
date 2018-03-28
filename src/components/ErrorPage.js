import React from 'react';
import { Link } from 'react-router-dom';

export default function ErrorPage () {
  return (
    <div className='error-page'>
      <h1> Error, Page Not Found </h1>
      <Link to='/'> Go Home </Link>
    </div>
  );
}
