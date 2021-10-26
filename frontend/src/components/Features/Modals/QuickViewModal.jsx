import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeQuickViewModal } from '../../../redux/actions/modalActions';
import { detailsProduct } from '../../../redux/actions/productActions';
import ProductDetail from '../../Partials/Product/ProductDetail';
import ProductGallery from '../../Partials/Product/ProductGallery';
import QuickViewSkeleton from '../Skeleton/QuickViewSkeleton';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(51,51,51,0.6)',
    zIndex: '1000',
  },
};

function QuickViewModal(props) {
  const dispatch = useDispatch();
  const { type, showModal, product: slug } = useSelector((state) => state.modal);

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  useEffect(() => {
    if (slug) {
      dispatch(detailsProduct(slug));
    }
  }, [dispatch, slug]);

  function closeModal() {
    dispatch(closeQuickViewModal());
  }

  return (
    <>
      {type === 'quickview' && showModal && (
        <Modal
          isOpen={showModal}
          ariaHideApp={false}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Quickview Modal"
          className="modal"
          id="modal__quickview"
        >
          <div className="modal__content">
            <button type="button" className="modal__close" onClick={closeModal}>
              <i className="las la-times"></i>
            </button>

            {loading ? (
              <QuickViewSkeleton />
            ) : error ? (
              <div>{error}</div>
            ) : (
              <div className="product__details-wrapper">
                <div className="row">
                  <div className="col-md-6">
                    <ProductGallery product={product} adClass="product__gallery-horizontal" />
                  </div>
                  <div className="col-md-6">
                    <ProductDetail product={product} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}

export default QuickViewModal;
