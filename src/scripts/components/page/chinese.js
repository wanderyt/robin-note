import React from 'react';
import PropTypes from 'prop-types';
import { UIButton } from '../../uikit/UIButton';
import UIDropdown from '../../uikit/UIDropdown';
import axios from 'axios';

import * as ChineseConfig from '../../../config/chinese-char-dic.json';

import '../../../styles/components/chinese.scss';

class Chinese extends React.Component {
    constructor() {
        super();

        this.state = {
            book: 3
        };
        this.initializeState();

        this.switchText = this.switchText.bind(this);
        this.getRelatedImage = this.getRelatedImage.bind(this);
    }

    initializeState() {
        let chars = ChineseConfig['siwu'][this.state.book].char,
            currentText = chars[0],
            words = this.getWords(currentText);

        this.state = {
            book: 3,
            index: 0,
            currentText,
            words,
            loading: true,
            textImageUrl: ''
        };
    }

    componentDidMount() {
        let searchText = this.state.currentText,
            words = this.state.words;
        this.getRelatedImage(words.length > 0 ? words[0] : searchText);
    }

    getRelatedImage(searchText) {
        axios
            .get(`/api/ins/searchText?searchText=${searchText}`)
            .then(response => {
                if (response.status === 200) {
                    let {imageUrl} = response.data;
                    if (imageUrl) {
                        this.setState({
                            textImageUrl: imageUrl
                        });
                    }
                }
                this.setState({
                    loading: false
                });
            });
    }

    getWords(text) {
        let wordList = ChineseConfig['siwu'][this.state.book].word;
        return wordList.filter(word => word.indexOf(text) > -1);
    }

    switchText(flag) {
        let index = this.state.index,
            chars = ChineseConfig['siwu'][this.state.book].char;

        switch (flag) {
            case 'prev':
                --index;
                if (index < 0) {
                    index = chars.length - 1;
                }
                break;
            case 'next':
                ++index;
                if (index >= chars.length) {
                    index = 0;
                }
                break;
            case 'rand':
                index = Math.floor(Math.random() * chars.length);
                break;
            case 'reset':
                index = 0;
                break;
            default:
                break;
        }

        let currentText = chars[index],
            words = this.getWords(currentText);

        this.setState({
            index,
            currentText,
            words,
            loading: true
        });

        this.getRelatedImage(words.length > 0 ? words[0] : currentText);
    }

    changeBook(value) {
        this.setState({
            book: value
        });

        this.switchText('reset');
    }

    render() {
        let textImageStyle;

        if (this.state.textImageUrl) {
            textImageStyle = {
                backgroundImage: `url(${this.state.textImageUrl})`
            };
        }
        return (
            <div
                className="Chinese">
                <div className="Chinese__Header">
                    <span className="Chinese__HeaderText">学汉字</span>
                    <UIButton
                        text="换一个"
                        handleClick={() => this.switchText('rand')} />
                    <UIButton
                        text="上一个"
                        handleClick={() => this.switchText('prev')} />
                    <UIButton
                        text="下一个"
                        handleClick={() => this.switchText('next')} />
                    <UIDropdown
                        options={[3,4,5]}
                        onChange={e => this.changeBook(e.target.value)} />
                </div>
                <div
                    className="Chinese__Main">
                    <div
                        className="Chinese__TextContainer Container">
                        <span className="Chinese__TextMain">{this.state.currentText}</span>
                    </div>
                    <div
                        className={`Chinese__TextImageContainer Container ${this.state.loading ? 'loadingSpinner' : ''}`}
                        style={!this.state.loading ? textImageStyle : {}}>
                    </div>
                    {/* <img src={`${this.state.loading ? 'https://loading.io/assets/img/ajax.gif' : this.state.textImageUrl}`} /> */}
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
