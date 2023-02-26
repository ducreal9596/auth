import { createAsyncThunk } from '@reduxjs/toolkit';
import config from '../../config';
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutFailed,
  logoutStart,
  logoutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from '../../redux/authSlice';
import { getUserFailed, getUserStart, getUserSuccess } from '../../redux/userSlice';
import request, { getAll } from '../request';

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await request.post('auth/login', user);
    dispatch(loginSuccess(res.data));
    navigate(config.routes.home);
  } catch (error) {
    dispatch(loginFailed());
  }
};
export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const res = await request.post('auth/register', user);
    dispatch(registerSuccess());
    navigate(config.routes.login);
    return res;
  } catch (error) {
    dispatch(registerFailed());
  }
};
export const getAllUser = async (token, dispatch, navigate) => {
  dispatch(getUserStart());
  try {
    const res = await getAll(`users/@${token.data.nickname}`, {
      headers: {
        Authorization: `Bearer ${token?.meta.token}`,
      },
    });
    dispatch(getUserSuccess(res.data));
  } catch (error) {
    dispatch(getUserFailed());
  }
};
export const logoutUser = async (user, dispatch, navigate) => {
  dispatch(logoutStart());
  try {
    const res = await request.post('auth/logout', {
      headers: {
        // token: `Bearer ${user?.meta.token}`,
        Authorization: `Bearer ${user?.meta.token}`,
      },
    });

    dispatch(logoutSuccess());
    navigate(config.routes.login);
    return res;
  } catch (error) {
    dispatch(logoutFailed());
  }
};
// export const logout = createAsyncThunk('user/logout', async (user) => {
//   try {
//     const res = await request.post('auth/logout', {
//       headers: {
//         Authorization: `Bearer ${user?.meta.token}`,
//       },
//     });
//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// });
export const logout = async (token) => {
  try {
    await request.post(
      'auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (err) {
    console.log(err);
  }
};
