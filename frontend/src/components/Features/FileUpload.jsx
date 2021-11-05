import { Avatar, Badge, Spin } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../../redux/actions/uploadActions';
import { IMAGE_UPLOAD_RESET } from '../../redux/constants/uploadConstants';
import MessageBox from './MessageBox';

const FileUpload = ({ images, setImages }) => {
  const dispatch = useDispatch();
  const imageUpload = useSelector((state) => state.imageUpload);
  const { loading: loadingUpload, error: errorUpload, success: successUpload, image } = imageUpload;

  useEffect(() => {
    if (successUpload) {
      setImages([...images, ...image]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successUpload]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files;
    dispatch({ type: IMAGE_UPLOAD_RESET });
    dispatch(uploadImage(file, 'multiple'));
  };

  const handleImageRemove = (image) => {
    let filteredImages = images.filter((item) => {
      return item !== image;
    });
    setImages(filteredImages);
  };

  return (
    <>
      <div className="row">
        <div className="mb-1">
          {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>}
          {loadingUpload && (
            <div className="text-center">
              <Spin />
            </div>
          )}
        </div>
        <div className="mb-1">
          {images.length > 0 ? (
            images.map((image, i) => (
              <Badge
                count="X"
                key={i}
                onClick={() => handleImageRemove(image)}
                style={{ cursor: 'pointer' }}
              >
                <Avatar src={image} size={100} shape="square" className="ml-3 mb-1" />
              </Badge>
            ))
          ) : (
            <div className="ml-3 text-danger">No images</div>
          )}
        </div>
      </div>
      <label className="btn btn-primary">
        Choose File
        <input type="file" multiple hidden onChange={uploadFileHandler} />
      </label>
    </>
  );
};

export default FileUpload;
