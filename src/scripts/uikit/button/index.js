import React, {Component} from 'react';
import PropTypes from 'prop-types';

class UIButton extends Component {
  render() {
    return (
      <button
        className={`UIButton ${this.props.classNames || ''}`}
        onClick={this.props.handleClick}>
        {
          `${this.props.text || 'My Button for David'}`
        }
      </button>
    );
  }
};

UIButton.displayName = "UIButton";

UIButton.propTypes = {
  classNames: PropTypes.string,
  text: PropTypes.string,
  handleClick: PropTypes.function
}

export default UIButton;
