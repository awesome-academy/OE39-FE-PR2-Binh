import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Qty({ changeQty, max = 1000, value = 1, product }) {
  const [current, setCurrent] = useState(value);

  useEffect(() => {
    setCurrent(value);
  }, [value]);

  function increment() {
    if (max <= 0 || max <= current) {
      return;
    }

    changeQty && changeQty(current + 1, product);
    setCurrent((prev) => prev + 1);
  }

  function decrement() {
    if (current > 1) {
      changeQty && changeQty(current - 1, product);
      setCurrent((prev) => prev - 1);
    }
  }

  function handleChange(e) {
    if (parseInt(e.target.value) <= max) {
      changeQty && changeQty(parseInt(e.target.value), product);
      setCurrent(parseInt(e.target.value));
    } else {
      toast.error(`Please enter lower than ${max}`);
    }
  }

  return (
    <div className="product__quantity">
      <div className="input-group input-spinner">
        <div className="input-group-prepend">
          <button
            style={{ minWidth: '26px' }}
            className="btn btn-decrement btn-spinner"
            type="button"
            onClick={decrement}
          >
            <i className="las la-minus"></i>
          </button>
        </div>
        <input
          name="qty"
          type="number"
          className="form-control text-center"
          min={1}
          max={max}
          onChange={handleChange}
          value={current}
          required
        />
        <div className="input-group-append">
          <button
            style={{ minWidth: '26px' }}
            className="btn btn-increment btn-spinner"
            type="button"
            onClick={increment}
          >
            <i className="las la-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Qty;
