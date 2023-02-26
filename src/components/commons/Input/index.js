import React from 'react';
import classNames from 'classnames/bind';
import styles from './Input.module.scss';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
const cl = classNames.bind(styles);

function Input({ hidden, title, inputName, inputValue, messageRequired, inputType }) {
  const { register, errors } = useFormContext();
  return (
    <div className={cl('wrapper')}>
      <label htmlFor={title}>{title}</label>
      <input
        type={inputType}
        id={title}
        hidden={hidden}
        name={inputName}
        value={inputValue}
        {...register(inputName, {
          required: messageRequired,
        })}
      />
      <p className={cl('error')}>
        <ErrorMessage errors={errors} name={inputName} />
      </p>
    </div>
  );
}

export default Input;
