import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import { ImageOverlayWithDesc } from "../../uikit/UIOverlay";
import ImageContainer from '../../uikit/ImageContainer';
import { UIButton } from '../../uikit/UIButton';
import { UISearchBox } from '../../uikit/UISearchBox';
import {ids as InsList} from '../../../config/ins-config.json';
import {debounce} from '../../uikit/debounce';
import axios from 'axios';

import '../../../styles/components/Instagram.scss';

class Instagram extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            nextTimeHash: '',
            hasNext: false,
            loading: false,
            isLoadMoreOn: true,
            insName: ''
        };

        this.displayImage = this.displayImage.bind(this);
        this.closeImageHandler = this.closeImageHandler.bind(this);
        this.loadingMorePhotos = this.loadingMorePhotos.bind(this);
        this.toggleLoadMore = this.toggleLoadMore.bind(this);
        this.loadPhotos = this.loadPhotos.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        // if insName is not changed, and also there are photos displayed, then do not update
        // once insName is changed, the photos will be cleared before new data is fetched(this.state.data.length == 0)
        if (this.state.insName === nextState.insName) {
            if (this.state.data.length < nextState.data.length) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }

    componentDidMount() {
        this.loadPhotos(this.state.insName);

        document.addEventListener('scroll', this.loadingMorePhotos);
    }

    displayImage(imgUrl, imgDesc) {
        if (imgUrl) {
            this.setState({
                imgUrl,
                imgDesc
            });
        }
    }

    loadPhotos(insName) {
        if (insName) {
            this.setState({
                loading: true
            });

            axios
                .get(`/api/ins/images?id=${insName}&offset=30`)
                .then(response => {
                    if (response.status === 200) {
                        let {data, hasNext, nextCursor} = response.data;
                        this.setState({
                            nextTimeHash: nextCursor,
                            hasNext: hasNext,
                            data: data,
                            loading: false
                        });
                    } else {
                        this.setState({
                            loading: true
                        });
                    }
                });
        }
    }

    // check whether current scroll is to bottom
    loadingMorePhotos() {
        // window.innerHeight + window.scrollY >= document.body.offsetHeight not available for IE
        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight && this.state.hasNext && !this.state.loading) {
            this.setState({
                loading: true
            });

            axios(`/api/ins/images?id=${this.state.insName}&offset=30&nextTimeHash=${this.state.nextTimeHash}`)
                .then(function (response) {
                    if (response.status === 200) {
                        let {data, hasNext, nextCursor} = response.data;
                        this.setState({
                            nextTimeHash: nextCursor,
                            hasNext: hasNext,
                            data: [...this.state.data, ...data],
                            loading: false
                        });
                    } else {
                        this.setState({
                            loading: false
                        });
                    }
                }.bind(this));
        }
    }

    componentWillMount() {
        // TODO: Should use throttle for handleTagSelect event to limit user click frequency
        // this.handleTagSelect = debounce(this.handleTagSelect, 5000, this);
    }

    handleTagSelect(name) {
        this.setState({
            data: [],
            nextTimeHash: '',
            hasNext: false,
            insName: name
        });

        this.loadPhotos(name);
    }

    selectTag(name) {
        this.handleTagSelect(name);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.loadingMorePhotos);
    }

    closeImageHandler() {
        this.setState({
            imgUrl: '',
            imgDesc: ''
        });
    }

    toggleLoadMore() {
        let currentStatus = this.state.isLoadMoreOn;
        if (currentStatus) {
            document.removeEventListener('scroll', this.loadingMorePhotos);
        } else {
            document.addEventListener('scroll', this.loadingMorePhotos);
        }
        this.setState({
            isLoadMoreOn: !currentStatus
        });
    }

    render() {
        let tagList = InsList.slice(0, 10);
        return (
            <div
                className="Instagram">
                <div
                    className="Instagram__Main">
                    <div
                        className="Instagram__ToolBar">
                        <UIButton
                            text={`${this.state.isLoadMoreOn ? 'Turn off load more' : 'Turn on load more'}`}
                            handleClick={this.toggleLoadMore} />
                        <UISearchBox
                            ajaxUrl="/api/ins/search" />
                    </div>
                    <div className="Instagram__TopHitTags">
                        {tagList.map((el) => {
                            console.log(el);
                            return (
                                <div className="Instagram__TopHitTag"
                                    key={el.id}>
                                    <span className="Instagram__TopHitTagTitle"
                                        onClick={() => this.handleTagSelect(el.name)}>
                                        {el.name}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                    <div
                        className="Ins_Image_Gallery">
                        {this.state.data.map(item => {
                            return <ImageContainer
                                key={item.id}
                                id={item.id}
                                insName={this.state.insName}
                                imgFullUrl={item.imgFullUrl}
                                imgThumbnailUrl={item.imgThumbnailUrl}
                                desc={item.desc}
                                onImageClick={() => this.displayImage(item.imgFullUrl, item.desc)} />
                        })}
                    </div>
                    {/* Loading more */}
                    {
                        this.state.loading && <div className="LoadMore">Loading more...</div>
                    }
                </div>
                <ImageOverlayWithDesc
                    isShown={this.state.imgUrl ? true : false}
                    imgUrl={this.state.imgUrl}
                    closeCallback={this.closeImageHandler}
                    desc={this.state.imgDesc} />
            </div>
        );
    }
}

Instagram.propTypes = {
    username: PropTypes.string
};

export default Instagram;