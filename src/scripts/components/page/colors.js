import React from 'react';
import {webColors, nativeColors} from '../../../config/colors';

import "../../../styles/components/colors.scss";

const Colors = () => (
  <div className="colors__container">
    <div className="colors__title">Web Colors:</div>
    {webColors && Object.keys(webColors).map((key) => (
      <div className="colors__item"
        style={{backgroundColor: webColors[key]}}>
        <div className="colors__item__name">
          <div className="colors__item__name__content">{key}</div>
          <div className="colors__item__name__content">{webColors[key]}</div>
        </div>
      </div>
    ))}
    <div>Native Colors:</div>
    {nativeColors && Object.keys(nativeColors).map((key) => (
      <div className="colors__item"
        style={{backgroundColor: nativeColors[key]}}>
        <div className="colors__item__name">
          <div className="colors__item__name__content">{key}</div>
          <div className="colors__item__name__content">{nativeColors[key]}</div>
        </div>
      </div>
    ))}
  </div>
);

export default Colors;