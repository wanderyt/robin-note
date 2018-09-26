import React from 'react';
import PropTypes from 'prop-types';

import UIDateStamp from './UIDateStamp';

import '../../styles/uikit/UIFinTile.scss'

class UIFinTile extends React.Component {
    render() {
        return (
            <div className="UIFinTile">
                <div className="UIFinTile__Row">
                    <div className="UIFinTile__Column">
                        <UIDateStamp
                            dateType='standard'
                            dateLocal={this.props.date} />
                    </div>
                    <div className="UIFinTile__Column UIFinTile__Expense">
                        <span className="UIFinTile__ExpenseSymbol">¥</span>
                        <span className="UIFinTile__ExpenseNumber">{this.props.money}</span>
                    </div>
                </div>
                <div className="UIFinTile__Category">
                    {this.props.category} - {this.props.subcategory}
                </div>
                <div className="UIFinTile__Comment">
                    {this.props.comment}
                </div>
            </div>
        )
    }
};

UIFinTile.displayName = 'UIFinTile';

export {
    UIFinTile
};