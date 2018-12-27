import React from 'react';

const Row = ({rowData, key, clickHandler}) => {
  return (
    <tr onClick={clickHandler}>
      {
        Object.keys(rowData).map(item => {
          console.log(item);
          return (
            <td key={key}>
              <div>{rowData[item]}</div>
            </td>
          );
        })
      }
    </tr>
  );
};

export default Row;
