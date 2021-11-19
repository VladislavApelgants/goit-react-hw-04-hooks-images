import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import s from './Searchbar.module.scss';
import { FcSearch } from 'react-icons/fc';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  getQuery = e => {
    const { value } = e.currentTarget;
    this.setState({ query: value.toLowerCase() });
  };

  handleSubmit = e => {
    const { query } = this.state;
    e.preventDefault();
    if (query.trim() === '') {
      return toast.warn('ээээ, пустая строка, введи что-то!');
    }

    this.props.onSubmit(query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchFormButton">
            <span className="SearchFormButtonLabel">
              <FcSearch size="25px" />
            </span>
          </button>

          <input
            className="SearchFormInput"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.getQuery}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
