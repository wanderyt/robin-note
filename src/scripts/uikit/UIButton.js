import React, { Component } from 'react';

class UIButton extends Component {
    render() {
        return (
            <button
                className={`UIButton ${this.props.classNames || ''}`}
                onClick={this.props.onClick}>
                {
                    `${this.props.text || 'My Button for David'}`
                }
            </button>
        );
    }
};

UIButton.displayName = "UIButton";

export {
    UIButton
};