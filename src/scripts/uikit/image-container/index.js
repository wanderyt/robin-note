import React from 'react';
import LazyLoad from 'react-lazyload';
import PropTypes from 'prop-types';

import './index.scss';

class ImageContainer extends React.Component {
  componentDidMount() {
    if (this.props.imgFullUrl) {
      fetch(`/api/ins/downloadImage?img=${this.props.imgFullUrl}&type=ins&id=${this.props.id}&insName=${this.props.insName}`).then((resp) => {
        console.log(resp);
      });
    }
  }
  render() {
    let style = {
      backgroundImage: `url(${this.props.imgThumbnailUrl})`
    };
    return (
      <div
        className="ImageContainer">
        <LazyLoad
          height={200}>
          <div
            className="image"
            style={style}
            onClick={this.props.onImageClick} />
        </LazyLoad>
        {/* {
          this.props.desc &&
          <div className="ImageCaption">
            {this.props.desc}
          </div>
        } */}
      </div>
    )
  }
}

ImageContainer.propTypes = {
  id: PropTypes.string,
  imgUrl: PropTypes.string,
  desc: PropTypes.string,
  onImageClick: PropTypes.func
}

export default ImageContainer;