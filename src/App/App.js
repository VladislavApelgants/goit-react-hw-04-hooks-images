import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './App.module.scss';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Modal from '../Modal';

function App() {
  const [searchbarQuery, setSearchbarQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [large, setLarge] = useState('');
  const [descr, setDescr] = useState('');
  const [page, setPage] = useState(1);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const searchbarFormSubmit = query => {
    setSearchbarQuery(query.trim());
    setPage(1);
  };

  const largeImg = (img, alt) => {
    setLarge(img);
    setDescr(alt);
    toggleModal();
  };

  const changePage = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Searchbar onSubmit={searchbarFormSubmit} />
      <section className={s.sectionGallery}>
        <ImageGallery
          searchImage={searchbarQuery}
          openLarge={largeImg}
          page={page}
          handlPage={changePage}
        />
      </section>
      {showModal && <Modal onClose={toggleModal} img={large} alt={descr} />}

      <ToastContainer position="top-center" autoClose={3000} theme="dark" />
    </>
  );
}

export default App;
