import React from 'react';
import PropTypes from 'prop-types';
import { UIButton } from '../../uikit/UIButton';

import * as ChineseConfig from '../../../config/chinese-char-dic.json';

import '../../../styles/components/chinese.scss';

class Chinese extends React.Component {
    constructor() {
        super();

        this.state = {
            index: 0,
            currentText: '',
            words: []
        };

        this.changeText = this.changeText.bind(this);
    }

    changeText() {
        let index = this.state.index,
            chars = ChineseConfig['siwu']['3'].char,
            currentText, words;

        if (index >= chars.length) {
            index = 0;
        }

        currentText = chars[index];

        words = this.getWords(currentText);

        this.setState({
            index: ++index,
            currentText,
            words
        });
    }

    getWords(text) {
        let wordList = ChineseConfig['siwu']['3'].word;
        return wordList.filter(word => word.indexOf(text) > -1);
    }

    render() {
        return (
            <div
                className="Chinese">
                <div className="Chinese__Header">
                    <span className="Chinese__HeaderText">学汉字</span>
                    <UIButton
                        text="换一个"
                        handleClick={this.changeText} />
                </div>
                <div
                    className="Chinese__Main">
                    <div
                        className="Chinese__TextContainer">
                        <span className="Chinese__TextMain">{this.state.currentText}</span>
                    </div>
                    <div
                        className="Chinese__WordContainer">
                        {this.state.words.map((word, index) =>
                            <div className="Chinese__WordMain"
                                key={index}>
                                {word}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}


export default Chinese;
