import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import { ImageOverlay } from "../../uikit/UIOverlay";
import ImageContainer from '../../uikit/ImageContainer';
import { UIButton } from '../../uikit/UIButton';

import '../../../styles/components/Instagram.scss';

class Instagram extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            nextTimeHash: '',
            hasNext: false,
            loading: false,
            isLoadMoreOn: true
        };

        this.displayImage = this.displayImage.bind(this);
        this.closeImageHandler = this.closeImageHandler.bind(this);
        this.loadingMorePhotos = this.loadingMorePhotos.bind(this);
        this.toggleLoadMore = this.toggleLoadMore.bind(this);
    }
    componentDidMount() {
        fetch(`/api/ins/images?id=ARSENAL&offset=30`)
            .then((resp) => resp.json())
            .then(respData => {
                let {data, hasNext, nextCursor} = respData;
                this.setState({
                    nextTimeHash: nextCursor,
                    hasNext: hasNext,
                    data: data
                });
            });

        document.addEventListener('scroll', this.loadingMorePhotos);
    }

    displayImage(imgUrl) {
        if (imgUrl) {
            this.setState({
                imgUrl: imgUrl
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

            fetch(`/api/ins/images?id=ARSENAL&offset=30&nextTimeHash=${this.state.nextTimeHash}`)
                .then((resp) => resp.json())
                .then(function (respData) {
                    let {data, hasNext, nextCursor} = respData;
                    this.setState({
                        nextTimeHash: nextCursor,
                        hasNext: hasNext,
                        data: [...this.state.data, ...data],
                        loading: false
                    });
                }.bind(this));
        }
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.loadingMorePhotos);
    }

    closeImageHandler() {
        this.setState({
            imgUrl: ''
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
        return (
            <div
                className="Instagram">
                <div
                    className="Instagram__Main">
                    <UIButton
                        text={`${this.state.isLoadMoreOn ? 'Turn off load more' : 'Turn on load more'}`}
                        handleClick={this.toggleLoadMore} />
                    <div
                        className="Ins_Image_Gallery">
                        {this.state.data.map(item => {
                            {/* let style = {
                                backgroundImage: `url(${item.imgThumbnailUrl})`
                            };
                            return (
                                <div
                                    className="image-item"
                                    key={item}
                                    onClick={() => this.displayImage(item)}>
                                    <LazyLoad
                                        height={200}>
                                        <div
                                            className="image"
                                            style={style} />
                                    </LazyLoad>
                                </div>
                            ); */}
                            return <ImageContainer
                                key={item.id}
                                id={item.id}
                                imgFullUrl={item.imgFullUrl}
                                imgThumbnailUrl={item.imgThumbnailUrl}
                                desc={item.desc}
                                onImageClick={() => this.displayImage(item.imgFullUrl)} />
                        })}
                    </div>
                    {/* Loading more */}
                    {
                        this.state.loading && <div>Loading more...</div>
                    }
                </div>
                <ImageOverlay
                    isShown={this.state.imgUrl ? true : false}
                    imgUrl={this.state.imgUrl}
                    closeCallback={this.closeImageHandler} />
            </div>
        );
    }
}

Instagram.propTypes = {
    username: PropTypes.string
};

export default Instagram;