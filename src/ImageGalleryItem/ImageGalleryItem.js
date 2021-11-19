import s from './ImageGalleryItem.module.scss';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

export default function ImageGalleryItem({ data, modalImage }) {
  return (
    <>
      {data.map(elem => (
        <li
          key={uuidv4()}
          className={s.ImageGalleryItem}
          onClick={modalImage}
          large={elem.largeImageURL}
          name={elem.user}
        >
          <img
            src={elem.webformatURL}
            alt={elem.user}
            className={s.ImageGalleryItemImage}
          />
        </li>
      ))}
    </>
  );
}

ImageGalleryItem.propTypes = {
  data: PropTypes.array,
  modalImage: PropTypes.func,
};
