import React, { Children } from 'react';
import PropTypes from 'prop-types';

import '../../styles/uikit/overlay.scss';

class UIOverlay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isShown: props.isShown
        };

        this.toggleOverlay = this.toggleOverlay.bind(this);
        this.onESCImageClose = this.onESCImageClose.bind(this);
    }
    toggleOverlay() {
        let currentStatus = this.state.isShown;
        this.setState({
            isShown: !currentStatus
        });

        // Call callback funtion if closing overlay and callback function is defined.
        if (currentStatus && this.props.closeCallback) {
            this.props.closeCallback();
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            isShown: nextProps.isShown
        });
    }
    onESCImageClose(evt) {
        if (evt.keyCode === 27) {
            this.setState({
                isShown: false
            });
        }

        if (this.props.closeCallback) {
            this.props.closeCallback();
        }
    }
    componentDidMount() {
        document.addEventListener('keyup', this.onESCImageClose);
    }
    componentWillUnmount() {
        document.removeEventListener('keyup', this.onESCImageClose);
    }
    render() {
        return (
            <div
                className={`Overlay ${this.state.isShown ? '' : 'hidden'} ${this.props.classNames}`}>
                <div
                    className="Overlay__Main" />
                {this.props.children}
                <div
                    className="btn-close"
                    onClick={this.toggleOverlay}>
                </div>
            </div>
        )
    }
}

UIOverlay.displayName = "UIOverlay";

UIOverlay.propTypes = {
    classNames: PropTypes.string,
    isShown: PropTypes.bool,
    closeCallback: PropTypes.func
};

class ImageOverlay extends React.Component {
    render() {
        let style = {
            backgroundImage: `url(${this.props.imgUrl})`
        };
        return (
            <UIOverlay
                classNames="ImageOverlay"
                isShown={this.props.isShown}
                closeCallback={this.props.closeCallback}>
                <div
                    className="ImageOverlay__Content"
                    style={style} />
            </UIOverlay>
        );
    }
}

ImageOverlay.displayName = "ImageOverlay";

ImageOverlay.propTypes = {
    isShown: PropTypes.bool,
    imgUrl: PropTypes.string,
    closeCallback: PropTypes.func
};

export {
    ImageOverlay,
    UIOverlay
};