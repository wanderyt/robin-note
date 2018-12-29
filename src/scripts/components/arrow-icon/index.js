import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './index.scss';

const ArrowIcon = ({className, direction}) => {
  return (
    <div className={cx('arrow-icon', `arrow-icon--${direction}`, className)} />
  );
};

ArrowIcon.propTypes = {
  className: PropTypes.string,
  direction: PropTypes.oneOf(['left', 'right', 'up', 'down']).isRequired
};

export default ArrowIcon;
