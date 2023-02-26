import classNames from 'classnames/bind';
import React from 'react';
import styles from './Button.module.scss';
const cl = classNames.bind(styles);

function Button({ children, onHandle }) {
  return (
    <div className={cl('wrapper')}>
      <button onClick={onHandle}>{children}</button>
    </div>
  );
}

export default Button;
