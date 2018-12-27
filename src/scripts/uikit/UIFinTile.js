import React from 'react';

import UIDateStamp from './UIDateStamp';

import '../../styles/uikit/UIFinTile.scss'

/**
 * Finance tile
 * @param {object} prop
 * @param {string} prop.date Date
 * @param {number} prop.money Expense
 * @param {string} prop.category Top level category
 * @param {string} prop.subcategory Sub level category
 * @param {string} prop.comment Comment
 */
const UIFinTile = ({date, money, category, subcategory, comment}) => (
  <div className="UIFinTile">
    <div className="UIFinTile__Row">
      <div className="UIFinTile__Column">
        <UIDateStamp
          dateType='standard'
          dateLocal={date} />
      </div>
      <div className="UIFinTile__Column UIFinTile__Expense">
        <span className="UIFinTile__ExpenseSymbol">¥</span>
        <span className="UIFinTile__ExpenseNumber">{money}</span>
      </div>
    </div>
    <div className="UIFinTile__Category">
      {category} - {subcategory}
    </div>
    <div className="UIFinTile__Comment">
      {comment}
    </div>
  </div>
);

UIFinTile.displayName = 'UIFinTile';

export {
  UIFinTile
};