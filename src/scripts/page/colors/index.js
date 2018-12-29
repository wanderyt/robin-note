import React from 'react';

import {webColors, nativeColors} from './config.json';
import "./index.scss";

const testString = process.env.REACT_APP_TEST_STRING;

const Colors = () => (
  <div className="Colors">
    <div className="colors__title">{testString}</div>
    <div className="colors__title">Web Colors:</div>
    <div className="colors__container">
      {webColors && Object.keys(webColors).map((key) => (
        <div className="colors__item"
          key={key}
          style={{backgroundColor: webColors[key]}}>
          <div className="colors__item__name">
            <div className="colors__item__name__content">{key}</div>
            <div className="colors__item__name__content">{webColors[key]}</div>
          </div>
        </div>
      ))}
    </div>
    <div className="colors__title">Native Colors:</div>
    <div className="colors__container">
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
  </div>
);

export default Colors;