import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './App.module.scss';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Modal from '../Modal';

class App extends Component {
  state = {
    searchbarQuery: '',
    showModal: false,
    large: '',
    descr: '',
  };

  toggleModal = () => {
    this.setState(state => {
      return { showModal: !state.showModal };
    });
  };

  searchbarFormSubmit = query => {
    this.setState({ searchbarQuery: query.trim() });
  };

  largeImg = (img, alt) => {
    this.setState({ large: img, descr: alt });
    this.toggleModal();
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.searchbarFormSubmit} />
        <section className={s.sectionGallery}>
          <ImageGallery
            searchImage={this.state.searchbarQuery}
            openLarge={this.largeImg}
          />
        </section>
        {this.state.showModal && (
          <Modal
            onClose={this.toggleModal}
            img={this.state.large}
            alt={this.state.descr}
          />
        )}

        <ToastContainer position="top-center" autoClose={3000} theme="dark" />
      </>
    );
  }
}

export default App;
