import React from 'react';

function Breadcrumb(props) {
  return (
    <div className="breadcrumb__nav">
      <div className="container">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="/">Library</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Data
          </li>
        </ol>
      </div>
    </div>
  );
}

export default Breadcrumb;
