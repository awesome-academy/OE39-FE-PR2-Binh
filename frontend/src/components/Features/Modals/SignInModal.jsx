import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { closeSignInModal } from '../../../redux/actions/modalActions';
import Signin from '../../Partials/Signin/Signin';
import Signup from '../../Partials/Signin/Signup';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(51,51,51,0.6)',
    zIndex: '1000',
  },
};

function SignInModal(props) {
  const dispatch = useDispatch();
  const { type, showModal } = useSelector((state) => state.modal);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    if (userInfo) {
      dispatch(closeSignInModal());
    }
  }, [dispatch, userInfo]);

  function closeModal() {
    dispatch(closeSignInModal());
  }
  return (
    <>
      {type === 'signin' && showModal && (
        <Modal
          isOpen={showModal}
          ariaHideApp={false}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Signin Modal"
          className="modal"
          id="modal__signin"
        >
          <div className="modal__content">
            <button type="button" className="modal__close" onClick={closeModal}>
              <i className="las la-times"></i>
            </button>
            <div className="form-box">
              <div className="form-tab">
                <Tabs selectedTabClassName="show" selectedTabPanelClassName="show active">
                  <TabList className="nav nav-pills nav-border-anim justify-content-center">
                    <Tab className="nav-item">
                      <span className="nav-link">Sign In</span>
                    </Tab>
                    <Tab className="nav-item">
                      <span className="nav-link">Register</span>
                    </Tab>
                  </TabList>

                  <div className="tab-content">
                    <TabPanel className="tab-pane fade">
                      <Signin />
                    </TabPanel>
                    <TabPanel className="tab-pane">
                      <Signup />
                    </TabPanel>
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default SignInModal;
