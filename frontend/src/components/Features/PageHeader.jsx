import React from 'react';

function PageHeader(props) {
  const { title } = props;
  return (
    <div
      className="page-header text-center"
      style={{
        backgroundImage: `url(${process.env.REACT_APP_BASE_URL}/images/page-header-bg.jpg)`,
      }}
    >
      <div className="container">
        <h1 className="page-title">{title}</h1>
      </div>
    </div>
  );
}

export default PageHeader;
