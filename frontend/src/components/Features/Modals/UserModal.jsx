import { Button, Checkbox, Form, Input, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeUserModal } from '../../../redux/actions/modalActions';
import { detailsUser, updateUser } from '../../../redux/actions/userActions';
import { USER_UPDATE_RESET } from '../../../redux/constants/userConstants';
import MessageBox from '../MessageBox';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(51,51,51,0.6)',
    zIndex: '1000',
  },
};

const initUserValues = {
  name: '',
  email: '',
  isAdmin: false,
};

function UserModal(props) {
  const [userValues, setUserValues] = useState(initUserValues);
  const dispatch = useDispatch();
  const { type, showModal, user: userId } = useSelector((state) => state.modal);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

  useEffect(() => {
    if (userId && (!user || successUpdate || user._id !== userId)) {
      dispatch({ type: USER_UPDATE_RESET });
      dispatch(detailsUser(userId));
    } else {
      setUserValues({
        name: user?.name,
        email: user?.email,
        isAdmin: user?.isAdmin,
      });
    }
  }, [dispatch, userId, user, successUpdate]);

  function closeModal() {
    dispatch(closeUserModal());
  }

  const onFinish = (values) => {
    dispatch(updateUser({ _id: userId, ...values }));
  };

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(userValues);
  }, [userValues, form]);

  return (
    <>
      {type === 'user' && showModal && (
        <Modal
          isOpen={showModal}
          ariaHideApp={false}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Quickview Modal"
          className="modal"
          id="modal__user"
        >
          <div className="modal__content">
            <button type="button" className="modal__close" onClick={closeModal}>
              <i className="las la-times"></i>
            </button>

            <br />

            {error && <MessageBox variant="danger">{error}</MessageBox>}
            {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
            {loading && (
              <div className="text-center">
                <Spin />
              </div>
            )}
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                name="name"
                label="Full name"
                rules={[{ required: true, message: 'Please input Name!' }]}
              >
                <Input type="text" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: 'Please input Email!' }]}
              >
                <Input type="email" />
              </Form.Item>
              <Form.Item label="Role">
                <Form.Item name="isAdmin" valuePropName="checked" noStyle>
                  <Checkbox>Is Admin</Checkbox>
                </Form.Item>
              </Form.Item>
              <Form.Item>
                <Button
                  className="text-right"
                  type="primary"
                  htmlType="submit"
                  loading={loadingUpdate}
                >
                  Update
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      )}
    </>
  );
}

export default UserModal;
