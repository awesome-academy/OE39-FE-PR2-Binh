import React from 'react';
import { Link } from 'react-router-dom';

function Breadcrumb({ breadcrumb }) {
  return (
    <div className="breadcrumb__nav">
      <div className="container">
        <ol className="breadcrumb">
          {breadcrumb.map((nav, index) => (
            <li
              key={index}
              className={`breadcrumb-item ${breadcrumb.length - 1 === index ? 'active' : ''}`}
            >
              <Link to={`${nav.href}`}>{nav.title}</Link>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Breadcrumb;
