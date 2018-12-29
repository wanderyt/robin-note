import React from 'react';

const MenuList = (props) => {
  return (
    <div
      className={`MenuList ${props.classNames}`}>
      <ul>
        {props.menuTitle}
        {
          props.menuItems.map((item) => (
            <li>{item.text}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default MenuList;