import React from 'react';
import EditableRow from './editable-row';
import Row from './row';

class EditableTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isEdit: false,
      indexEditing: 0,
      bodyData: props.body.slice(),
      dataSnapshot: props.body.slice(),
    }
  }

  handleRowClick = (idx) => {
    this.setState({
      isEdit: true,
      indexEditing: idx,
    });
  }

  handleEditRowChange = (rowData, idx) => {
    let prevData = this.state.dataSnapshot.slice();
    prevData.splice(idx, 1, rowData);
    this.setState({
      dataSnapshot: prevData
    });
  }

  saveData = () => {
    const {dataSnapshot} = this.state;
    this.setState({
      bodyData: dataSnapshot.slice(),
      isEdit: false
    });
  }

  render() {
    const {head} = this.props;
    const {isEdit, indexEditing, bodyData} = this.state;
    return (
      <div>
        <table>
          <thead>
            <tr>
              {
                head.map(element => {
                  console.log(element);
                  return (<th key={element.key}>{element.value}</th>);
                })
              }
            </tr>
          </thead>
          <tbody>
            {
              bodyData.map((item, idx) => (
                isEdit && indexEditing === idx ?
                  (<EditableRow rowData={item} key={idx} id={idx} changeHandler={this.handleEditRowChange} />)
                :
                  (<Row rowData={item} key={idx} clickHandler={() => this.handleRowClick(idx)} />)
              ))
            }
          </tbody>
        </table>
        {
          isEdit ? <button onClick={this.saveData}>Save</button> : null
        }
      </div>
    )
  };
};

export default EditableTable;
