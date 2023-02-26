import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import Header from '../../layouts/Header';
import { loginSuccess, logoutSuccess } from '../../redux/authSlice';
import { getAllUser, logout, logoutUser } from '../../until/apiRequestLogin';
import request from '../../until/request';

function Home(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const JWT = axios.create();
  const refreshToken = async () => {
    try {
      const res = await request.post(`auth/refreshToken`, {
        withCredentials: true,
      });
      return res.data.meta;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!user) {
      navigate(config.routes.login);
    }
    if (user?.meta.token) {
      getAllUser(user, dispatch, JWT);
    }
  }, []);
  JWT.interceptors.request.use(
    async (config) => {
      const date = new Date();
      const decoded = jwtDecode(user?.meta.token);
      if (decoded.exp < date.getTime() / 1000) {
        const data = refreshToken();
        const refreshUser = {
          ...user,
          meta: {
            token: data,
          },
        };
        dispatch(loginSuccess(refreshUser));
        config.headers['token'] = 'Bearer ' + data.meta.token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  const handleLogout = (e) => {
    // dispatch(logoutUser(user, dispatch, navigate));
    dispatch(logout(user?.meta.token));
  };
  return (
    <div>
      <Header />
      {user ? <h1> xin chào {user.data.nickname}</h1> : <>Đăng nhập</>}
      <div>
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  );
}

export default Home;
