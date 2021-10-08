import React from 'react';

function Qty(props) {
  return (
    <div className="product__quantity">
      <div className="input-group input-spinner">
        <div className="input-group-prepend">
          <button
            style={{ minWidth: '26px' }}
            className="btn btn-decrement btn-spinner"
            type="button"
          >
            <i className="las la-minus"></i>
          </button>
        </div>
        <input
          type="number"
          className="form-control text-center"
          min="1"
          max="1000"
          value="10"
          required
        />
        <div className="input-group-append">
          <button
            style={{ minWidth: '26px' }}
            className="btn btn-increment btn-spinner"
            type="button"
          >
            <i className="las la-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Qty;
