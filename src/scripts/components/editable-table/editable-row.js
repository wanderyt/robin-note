import React from 'react';
import PropTypes from 'prop-types';

class EditableRow extends React.Component {
  propTypes = {
    rowData: PropTypes.object,
    key: PropTypes.number,
    changeHandler: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      rowData: Object.assign({}, props.rowData),
      key: props.key
    };
  }

  onChange = (evt) => {
    const {value, name} = evt.target;
    const {rowData} = this.state;
    const {changeHandler, id} = this.props;
    const newData = Object.assign({}, rowData, {[name]: value});
    this.setState({
      rowData: newData
    });

    changeHandler(newData, id)
  }

  render() {
    const {rowData, id} = this.state;
    return (
      <tr>
        {
          Object.keys(rowData).map(item => (
            <td key={id}>
              <input type='input' value={rowData[item]} name={item} onChange={this.onChange} />
            </td>
          ))
        }
      </tr>
    );
  }
};

export default EditableRow;