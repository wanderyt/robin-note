import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import * as ImageConfig from "../../../config/config.json";

import '../../../styles/components/paint.scss';

class Paint extends React.Component {
    render() {
        return (
            <div
                className="Paint">
                {ImageConfig.images.map(item =>
                    <LazyLoad
                        height={200}
                        key={item}>
                        <img
                            src={`${item}:large`}
                            alt="This is a pic" />
                    </LazyLoad>
                )}
            </div>
        );
    }
}

Paint.contextTypes = {
    username: PropTypes.string
};

export default Paint;