import React from 'react';

import debounce from 'lodash.debounce';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.emitChangeDebounced = debounce(this.emitChange, 10); //250
    this.busquedaRef = React.createRef();
  }

  componentWillUnmount() {
    this.emitChangeDebounced.cancel();
  }

  render() {
    return (
      <form className='search'>
        <ion-icon name='search-outline'></ion-icon>
        <input
          className='search-input'
          type='text'
          ref={this.busquedaRef}
          defaultValue={this.props.value}
          onChange={this.handleChange}
          placeholder='Find your favorite country'
        />
      </form>
    );
  }

  handleChange = (e) => {
    e.preventDefault();
    this.emitChangeDebounced(e.target.value);
    console.log(e.target.value);

    var termino = this.busquedaRef.current.value;

    this.props.datosBusqueda(termino);
  };

  emitChange(value) {
    this.props.datosBusqueda(value);
  }
}

export default SearchBar;
