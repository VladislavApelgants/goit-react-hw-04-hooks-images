import { Component } from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.scss';
import ImageGalleryItem from '../ImageGalleryItem';
import ImageApi from '../imageApi';

export default class ImageGallery extends Component {
  state = {
    responseData: null,
    page: 1,
    error: '',
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const { searchImage } = this.props;

    if (prevProps.searchImage !== searchImage) {
      this.setState({
        responseData: null,
        page: 1,
      });
    }

    if (prevProps.searchImage !== searchImage || prevState.page !== page) {
      this.setState({
        status: 'pending',
      });

      ImageApi(searchImage, page)
        .then(data => {
          if (data.hits.length > 0) {
            this.setState(previos => {
              if (previos.responseData !== null) {
                return {
                  responseData: [...data.hits, ...previos.responseData],
                  status: 'resolved',
                };
              } else if (previos.responseData === null) {
                return { responseData: data.hits, status: 'resolved' };
              }
            });
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  changePage = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  sendModalImage = e => {
    const { openLarge } = this.props;
    const { large, name } = e.currentTarget.attributes;
    openLarge(large.value, name.value);
  };

  render() {
    const { responseData, error, status } = this.state;

    if (status === 'idle') {
      return <p className={s.enterQuery}>Enter query</p>;
    }

    if (status === 'pending') {
      return (
        <div className={s.spinnerBox}>
          <Loader
            type="Oval"
            color="#3f51b5"
            height={100}
            width={100}
            timeout={3000}
          />
        </div>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          {responseData && (
            <button type="button" className="Button" onClick={this.changePage}>
              Load more
            </button>
          )}
          <ul className={s.ImageGallery}>
            {responseData && (
              <ImageGalleryItem
                data={responseData}
                modalImage={this.sendModalImage}
              />
            )}
          </ul>
        </>
      );
    }

    if (status === 'rejected') {
      return <p>{error.message}</p>;
    }
  }
}

ImageGallery.propTypes = {
  searchImage: PropTypes.string,
  openLarge: PropTypes.func,
};
