import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import * as ImageConfig from "./config.json";
import {ImageOverlay} from "../../uikit/overlay";
import axios from 'axios';

import './index.scss';

class Paint extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imgUrl: ''
    };

    this.displayImage = this.displayImage.bind(this);
  }
  componentDidMount() {
    ImageConfig.images.map(item => {
      axios(`/api/ins/downloadImage?img=${item.split('media/')[1]}&type=twitter`).then((resp) => {
        console.log(resp.data);
      });
    });
  }

  displayImage(imgUrl) {
    if (imgUrl) {
      this.setState({
        imgUrl: imgUrl
      });
    }
  }

  render() {
    return (
      <div
        className="Paint">
        <div
          className="paint-main">
          {ImageConfig.images.map(item => {
            let style = {
              backgroundImage: `url(${item})`
            };
            return (
              <div
                className="image-item"
                key={item}
                onClick={() => this.displayImage(item)}>
                <LazyLoad
                  height={200}>
                  <div
                    className="image"
                    style={style} />
                </LazyLoad>
              </div>
            );
          })}
        </div>
        <ImageOverlay
          isShown={this.state.imgUrl ? true : false}
          imgUrl={this.state.imgUrl} />
      </div>
    );
  }
}

Paint.contextTypes = {
  username: PropTypes.string
};

export default Paint;