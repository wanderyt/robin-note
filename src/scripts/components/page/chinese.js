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
            textIndex: 0,
            currentText,
            words,
            loading: true,
            textImageUrl: '',
            imageIndex: 0,
            textImageUrls:[]
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
                    let {imageUrl, imageUrls} = response.data;
                    if (imageUrl) {
                        this.setState({
                            textImageUrl: imageUrl,
                            textImageUrls: imageUrls
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
        let textIndex = this.state.textIndex,
            chars = ChineseConfig['siwu'][this.state.book].char;

        switch (flag) {
            case 'prev':
                --textIndex;
                if (textIndex < 0) {
                    textIndex = chars.length - 1;
                }
                break;
            case 'next':
                ++textIndex;
                if (textIndex >= chars.length) {
                    textIndex = 0;
                }
                break;
            case 'rand':
                textIndex = Math.floor(Math.random() * chars.length);
                break;
            case 'reset':
                textIndex = 0;
                break;
            default:
                break;
        }

        let currentText = chars[textIndex],
            words = this.getWords(currentText);

        this.setState({
            textIndex,
            currentText,
            words,
            imageIndex: 0,
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

    switchImage(flag) {
        let imageIndex = this.state.imageIndex,
            textImageUrls = this.state.textImageUrls;

        switch (flag) {
            case 'prev':
                --imageIndex;
                if (imageIndex < 0) {
                    imageIndex = textImageUrls.length - 1;
                }
                break;
            case 'next':
                ++imageIndex;
                if (imageIndex >= textImageUrls.length) {
                    imageIndex = 0;
                }
                break;
            default:
                break;
        }

        this.setState({
            imageIndex
        });
    }

    render() {
        let textImageStyle;

        if (this.state.textImageUrls.length > 0) {
            textImageStyle = {
                backgroundImage: `url(${this.state.textImageUrls[this.state.imageIndex]})`
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
                        <UIButton
                            text="上一个图"
                            handleClick={() => this.switchImage('prev')} />
                        <UIButton
                            text="下一个图"
                            handleClick={() => this.switchImage('next')} />
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
