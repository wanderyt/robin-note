import React, {Component} from 'react';

class MenuTitle extends Component {
    state = {
        selection: false,
    };

    handleFoldStatus() {
        let currentSelection = this.state.selection;
        this.setState({
            selection: !currentSelection
        });
    }

    render() {
        return (
            <div
                className={`MenuTitle MenuItem ${this.state.selection || 'arrow-up'}`}>
                onClick={() => this.handleFoldStatus()}
                {this.props.text}
            </div>
        )
    }
};

export default MenuTitle;