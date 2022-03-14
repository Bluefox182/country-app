import React from 'react';
import CardCountry from './CardCountry';

const Countries = (props) => {
  const { countries, isFetch } = props;

  const renderCountries = (countries) => {
    return countries.map((_, index) => {
      return (
        isFetch && (
          <CardCountry
            key={`card_${index}`}
            index={index}
            borders={countries[index].borders}
            flag={countries[index].flags.svg}
            name={countries[index].name.common}
            region={countries[index].region}
            capital={countries[index].capital}
            population={countries[index].population}
          />
        )
      );
    });
  };
  if (isFetch) {
    if (countries.length > 0) {
      return (
        <div className='main-container'>
          <div className='container-grid'>{renderCountries(countries)}</div>
        </div>
      );
    } else {
      return (
        <div className='main-container'>
          <h2>Oops! Country Not Found.</h2>
        </div>
      );
    }
  } else {
    return (
      <div className='main-container'>
        <h2>Loading...</h2>
      </div>
    );
  }
};
export default Countries;
