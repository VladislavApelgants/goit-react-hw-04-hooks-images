import { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.scss';
import ImageGalleryList from '../ImageGalleryItem';
import ImageApi from '../imageApi';

export default function ImageGallery({
  searchImage,
  openLarge,
  page,
  handlPage,
}) {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    setResponseData(null);
    setStatus('idle');
  }, [searchImage]);

  useEffect(() => {
    if (!searchImage) {
      return;
    }

    setStatus('pending');
    ImageApi(searchImage, page)
      .then(data => {
        if (data.hits.length > 0) {
          setResponseData(prevResponseData => {
            if (prevResponseData) {
              return [...data.hits, ...prevResponseData];
            }
            return setResponseData(data.hits);
          });
          setStatus('resolved');
        }
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [searchImage, page]);

  const changePage = () => {
    handlPage(page + 1);
  };

  const sendModalImage = e => {
    const { large, name } = e.currentTarget.attributes;
    openLarge(large.value, name.value);
  };

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
          <button type="button" className="Button" onClick={changePage}>
            Load more
          </button>
        )}
        {responseData && (
          <ImageGalleryList data={responseData} modalImage={sendModalImage} />
        )}
      </>
    );
  }

  if (status === 'rejected') {
    return <p>{error.message}</p>;
  }
}

ImageGallery.propTypes = {
  searchImage: PropTypes.string,
  openLarge: PropTypes.func,
};
