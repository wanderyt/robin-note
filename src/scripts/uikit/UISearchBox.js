import React from 'react';
import {debounce} from '../uikit/debounce';
import axios from 'axios';

import '../../styles/uikit/UISearchBox.scss';

class UISearchBox extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
      isShowList: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleChange(evt) {
    var value = evt.target.value;

    if (!value) {
      return;
    }

    if (this.props.ajaxUrl) {
      axios.get(this.props.ajaxUrl + `?searchString=${value}`)
        .then(function (data) {
          let userList = data.data.users || [];
          this.setState({
            data: userList,
            isShowList: userList.length > 0
          });
        }.bind(this));
    } else {
      setTimeout(function () {
        this.setState({
          data: [{
            id: 1,
            name: 'Houston',
            desc: 'Houston'
          }, {
            id: 2,
            name: 'London',
            desc: 'London'
          }, {
            id: 3,
            name: 'Shanghai',
            desc: 'Shanghai'
          }],
          isShowList: true
        });
      }.bind(this), 500);
    }
  }

  componentWillMount() {
    this.handleChange = debounce(this.handleChange, 1000, this);
  }

  handleSearchChange(evt) {
    evt.persist();
    this.handleChange(evt);
  }

  clickListItem(item) {
    var node = this.searchInput;
    node.value = item.desc;

    this.setState({
      isShowList: false
    });
  }

  render() {
    return (
      <div
        className={`UISearchBox ${this.props.classNames || ''}`}>
        <div
          className="SearchBox__Input">
          <input
            ref={node => this.searchInput = node}
            placeholder="Search"
            onChange={this.handleSearchChange} />
          <span className="SearchBox__SearchIcon" />
          <span className="SearchBox__LoadingIcon" />
        </div>
        <div
          className="Search__ListContainer">
          <ul
            className={`Search__List ${this.state.isShowList ? '' : 'hidden'}`}>
            {
              this.state.data.map(item => {
                return (
                  <li
                    key={item.id}
                    className="Search__ListItem"
                    onClick={() => this.clickListItem(item)}>
                    <div>
                      {item.desc}
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }
};

UISearchBox.displayName = 'UISearchBox';

export {
  UISearchBox
};