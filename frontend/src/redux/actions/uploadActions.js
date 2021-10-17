import Axios from 'axios';
import catchErrors from '../../utils/catchErrors';
import { uploadApiPath } from '../../utils/router';
import {
  IMAGE_UPLOAD_FAIL,
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOAD_SUCCESS,
} from '../constants/uploadConstants';

export const uploadImage =
  (media, type = 'single') =>
  async (dispatch, getState) => {
    dispatch({ type: IMAGE_UPLOAD_REQUEST });
    try {
      const {
        userSignin: { userInfo },
      } = getState();

      const bodyFormData = new FormData();

      if (type === 'single') {
        bodyFormData.append('media', media);
      } else {
        for (let i = 0; i < media.length; i++) {
          bodyFormData.append('media', media[i]);
        }
      }
      const { data } = await Axios.post(uploadApiPath(`s3/${type}`), bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      dispatch({ type: IMAGE_UPLOAD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: IMAGE_UPLOAD_FAIL, payload: catchErrors(error) });
    }
  };
