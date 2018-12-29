import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ArrowIcon from '../arrow-icon';

import './index.scss';

class Carousel extends React.Component {
  static propTypes = {
    classNames: PropTypes.string,
    perPage: PropTypes.number,
    duration: PropTypes.number,
    easeStyle: PropTypes.string,
    goToPrev: PropTypes.func,
    goToNext: PropTypes.func
  }

  static defaultProps = {
    goToPrev: () => void 0,
    goToNext: () => void 0,
    perPage: 4,
    duration: 1000,
    easeStyle: 'ease-in-out'
  }

  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0,
      pageLength: Math.ceil(props.children.length / props.perPage)
    };
  }

  goToPrev = (evt) => {
    this.setState({
      currentPage: Math.max(0, this.state.currentPage - 1)
    });

    this.props.goToPrev();
  }

  goToNext = (evt) => {
    this.setState({
      currentPage: Math.min(this.state.pageLength, this.state.currentPage + 1)
    });

    this.props.goToNext();
  }

  init() {
    const {perPage, children} = this.props;
    const container = this.container;
    const containerWidth = container.getBoundingClientRect().width;
    const {marginLeft, marginRight} = this.getChildMargins();

    const itemInnerWidth = (containerWidth - (perPage - 1) * marginLeft - (perPage - 1) * marginRight) / perPage;
    const itemOuterWidth = itemInnerWidth + marginLeft + marginRight;
    const sliderWidth = Math.max(children.length, perPage) * itemOuterWidth;

    this.setState({
      containerWidth,
      itemOuterWidth,
      sliderWidth,
      itemMarginLeft: marginLeft,
      itemMarginRight: marginRight
    });
  }

  getChildMargins = () => {
    const firstChild = this.slider.children[0];
    const childStyle = window.getComputedStyle(firstChild, null);

    return {
      marginLeft: parseFloat(childStyle.getPropertyValue('margin-left') || 0),
      marginRight: parseFloat(childStyle.getPropertyValue('margin-right') || 0)
    };
  }

  componentDidMount() {
    this.init();
  }

  bindContainer = (node) => {
    this.container = node;
  }

  bindSliderNode = (node) => {
    this.slider = node;
  }

  render() {
    const {sliderWidth, currentPage, pageLength, itemOuterWidth, itemMarginLeft} = this.state;
    const {perPage, duration, easeStyle, classNames, children} = this.props;
    let transformWidth = 0;

    // set slider frame transition
    if (sliderWidth) {
      transformWidth = -(perPage * currentPage * itemOuterWidth + itemMarginLeft);
    }

    const styles = {
      width: `${sliderWidth}px`,
      transform: `translateX(${transformWidth}px)`,
      transition: `transform ${duration}ms ${easeStyle}`
    };

    return (
      <div className={cx('Carousel', classNames)}>
        <div className={cx('Carousel__Container')} ref={this.bindContainer}>
          <div
            className='Carousel__Slider'
            ref={this.bindSliderNode}
            style={styles}>
            {
              React.Children.map(children, (child, index) => (
                <div key={index} className='Carousel__Item'>
                  <child.type {...child.props} />
                </div>
              ))
            }
          </div>
        </div>
        <div className={cx('Carousel__Buttons')}>
          {
            currentPage > 0 && (
              <button
                className="Carousel__Buttons__Prev"
                onClick={this.goToPrev}
              >
                <ArrowIcon className="Carousel__PrevArrow" direction="left" />
              </button>
            )
          }
          {
            currentPage < pageLength - 1 && (
              <button
                className="Carousel__Buttons__Next"
                onClick={this.goToNext}
              >
                <ArrowIcon className="Carousel__NextArrow" direction="right" />
              </button>
            )
          }
        </div>
      </div>
    )
  }
}

export default Carousel;
