import React from 'react';
import UIButton from '../../uikit/button';
import UIDropdown from '../../uikit/dropdown';
import axios from 'axios';

import * as ChineseConfig from './config.json';
import './index.scss';

class Chinese extends React.Component {
  constructor() {
    super();

    this.state = {
      book: '第三册'
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
      book: '第三册',
      textIndex: 0,
      currentText,
      words,
      loading: true,
      textImageUrl: '',
      imageIndex: 0,
      textImageUrls: []
    };
  }

  componentDidMount() {
    let { currentText, words, book } = this.state;
    this.getRelatedImage(words.length > 0 ? words[0] : currentText, book);
  }

  getRelatedImage(searchText, book) {
    axios
      .get(`/api/ins/searchText?searchText=${searchText}`)
      .then(response => {
        if (response.status === 200) {
          let { imageUrl, imageUrls } = response.data;
          if (imageUrl) {
            this.setState({
              book: book || this.state.book,
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

  switchText(flag, book) {
    let textIndex = this.state.textIndex,
      currentBook = book || this.state.book,
      chars = ChineseConfig['siwu'][currentBook].char;

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

    this.getRelatedImage(words.length > 0 ? words[0] : currentText, currentBook);
  }

  changeBook(value) {
    this.switchText('reset', value);
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

  changeTextImage(word) {
    this.setState({
      loading: true
    });

    this.getRelatedImage(word);
  }

  render() {
    let textImageStyle;

    if (this.state.textImageUrls && this.state.textImageUrls.length > 0) {
      textImageStyle = {
        backgroundImage: `url(${this.state.textImageUrls[this.state.imageIndex]})`
      };
    }/* TODO: else if (this.state.textImageUrl) {
            textImageStyle = {
                backgroundImage: `url(${this.state.textImageUrls[this.state.imageIndex]})`
            };
        } */
    return (
      <div
        className="Chinese">
        <div className="Chinese__Header">
          <span className="Chinese__HeaderText">学汉字</span>
          <UIButton
            classNames="button iconBtn lediIcon"
            text="换一个"
            handleClick={() => this.switchText('rand')} />
          <UIButton
            classNames="button iconBtn xiaoaiIcon"
            text="上一个"
            handleClick={() => this.switchText('prev')} />
          <UIButton
            classNames="button iconBtn jingangIcon"
            text="下一个"
            handleClick={() => this.switchText('next')} />
          <UIDropdown
            classNames="book__selection"
            options={['第三册', '第四册', '第五册']}
            onChange={e => this.changeBook(e.target.value)} />
        </div>
        <div
          className="Chinese__Main">
          <div
            className="Chinese__TextContainer Container">
            <span className="Chinese__TextMain">{this.state.currentText}</span>
          </div>
          <div>
            <div
              className={`Chinese__TextImageContainer Container ${this.state.loading ? 'loadingSpinner' : ''}`}
              style={!this.state.loading ? textImageStyle : {}} />

            <UIButton
              classNames="button longBtn"
              text="上一个图"
              handleClick={() => this.switchImage('prev')} />
            <UIButton
              classNames="button longBtn"
              text="下一个图"
              handleClick={() => this.switchImage('next')} />
          </div>
          {/* <img src={`${this.state.loading ? 'https://loading.io/assets/img/ajax.gif' : this.state.textImageUrl}`} /> */}
          <div
            className="Chinese__WordContainer">
            {this.state.words.map((word, index) =>
              <div className="Chinese__WordMain"
                key={index}
                onClick={() => this.changeTextImage(word)}>
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
