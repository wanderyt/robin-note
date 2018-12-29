import React from 'react';
import PropTypes from 'prop-types';

class UIDropdown extends React.Component {
  render() {
    var options = this.props.options || [];
    return (
      <div
        className={`UIDropdown ${this.props.classNames || ''}`}>
        <label className="UIDropdown__Label">
          <span className="UIDropdown__LabelText">{this.props.label}</span>
          <select
            className="UIDropdown__SelectField"
            onChange={this.props.onChange}>
            {
              options.length > 0 && options.map((item) => {
                if (typeof item === 'object') {
                  return (
                    <option
                      key={item[this.props.itemKey]}
                      value={item[this.props.itemValue]}>
                      {item[this.props.itemValue]}
                    </option>
                  )
                } else {
                  return (
                    <option
                      key={item}
                      value={item}>
                      {item}
                    </option>
                  )
                }
              })
            }
          </select>
        </label>
      </div>
    )
  }
}

UIDropdown.displayName = 'UIDropdown';

UIDropdown.propTypes = {
  options: PropTypes.array,
  label: PropTypes.string,
  itemKey: PropTypes.string,
  itemValue: PropTypes.string,
  onChange: PropTypes.func
};

export default UIDropdown;