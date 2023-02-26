import classNames from 'classnames/bind';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/commons/Button';
import Input from '../../components/commons/Input';
import config from '../../config';
import { loginUser } from '../../until/apiRequestLogin';
import styles from './Login.module.scss';
const cl = classNames.bind(styles);
function Login(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const methods = useForm();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const { handleSubmit } = methods;
  const onSubmit = (data) => {
    loginUser(data, dispatch, navigate);
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
          <Button>add</Button>
        </form>
      </FormProvider>
    </div>
  );
}

export default Login;
