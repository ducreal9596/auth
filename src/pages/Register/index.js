import classNames from 'classnames/bind';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/commons/Button';
import Input from '../../components/commons/Input';
import config from '../../config';
import { getUser } from '../../redux/authSlice';
import { registerUser } from '../../until/apiRequestLogin';
import request from '../../until/request';
import styles from './Register.module.scss';
const cl = classNames.bind(styles);
function Register(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const methods = useForm();
  const { handleSubmit, reset } = methods;
  const onSubmit = (data) => {
    registerUser(data, dispatch, navigate);
  };
  useEffect(() => {
    if (user) {
      navigate(config.routes.home);
    }
  }, []);
  return (
    <div className={cl('wrapper')}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input inputName={'email'} inputType={'text'} title="email" messageRequired={'Vui long nhap thong tin'} />
          <Input
            inputName={'password'}
            inputType={'text'}
            title="Password"
            messageRequired={'Vui long nhap thong tin'}
          />
          <Input inputName={'type'} inputType={'text'} inputValue="email" hidden />
          <Button>add</Button>
        </form>
      </FormProvider>
    </div>
  );
}

export default Register;
