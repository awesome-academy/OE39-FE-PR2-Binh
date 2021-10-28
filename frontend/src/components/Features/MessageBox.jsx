import React, { useState } from 'react';

function MessageBox(props) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {isOpen ? (
        <div
          className={`alert alert-${props.variant || 'info'} alert-dismissible fade show ${
            props.adClass ? props.adClass : ''
          }`}
        >
          <div className="alert-content">{props.children}</div>
          <button type="button" className="close" onClick={() => setIsOpen(!isOpen)}>
            <i className="las la-times"></i>
          </button>
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default MessageBox;
