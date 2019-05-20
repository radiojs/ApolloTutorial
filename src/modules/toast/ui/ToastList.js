import React from 'react';
import PropTypes from 'prop-types';
import { Toast } from 'radio-ui';

class ToastList extends React.Component {
  render() {
    const { toasts, onClose } = this.props;

    return (
      <div className="ToastList">
        {toasts.map(toast => (
          <Toast key={toast._id} {...toast} onClose={onClose} />
        ))}
      </div>
    )
  }
}

ToastList.propTypes = {
  toasts: PropTypes.arrayOf(PropTypes.object),
};

ToastList.defaultProps = {
  toasts: [],
};

export default ToastList;
