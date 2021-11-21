import s from './ImageGalleryItem.module.scss';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

export default function ImageGalleryList({ data, modalImage }) {
  return (
    <ul className={s.ImageGallery}>
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
    </ul>
  );
}

ImageGalleryList.propTypes = {
  data: PropTypes.array,
  modalImage: PropTypes.func,
};
