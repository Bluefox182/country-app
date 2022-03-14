import React from 'react';
import './index.css';
import SearchBar from './components/SearchBar';
import Select from './components/Select';
import Navbar from './components/Navbar';
import Countries from './components/Countries';
import CountryDetails from './pages/CountryDetails';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends React.Component {
  state = {
    regiones: ['Africa', 'Americas', 'Antartic', 'Asia', 'Europe', 'Oceania'],
    paises: [],
    filtered: [],
    busqueda: '',
    region: '',
    modo: 'light',
    darkMode: false,
    isFetch: false,
  };
  getApi = () => {
    const url = 'https://restcountries.com/v3.1/all/';
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        var countries = Array.from(data);
        //Actualizar el estado con los países
        this.setState({
          paises: countries,
          filtered: countries,
          isFetch: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount() {
    this.getApi();
    console.log('Component did Mount');
    console.log('Se hizo una llamada a la API');
  }

  datosBusqueda = (termino) => {
    this.setState({ busqueda: termino }, () => {
      //this.getCountryName(this.state.nombres);
      this.filterCountries(this.state.paises);
    });
  };

  datosFiltro = (continente) => {
    this.setState({ region: continente }, () =>
      this.filterCountries(this.state.paises)
    );
  };

  filterCountries = (countries) => {
    //Convert Objects into a [key, value] array pairs;
    const asArray = Object.entries(countries);
    //Filter our countries Object list
    const filtered = asArray.filter(([key, value]) => {
      //Check if official name or common name start with our search
      let matchName = value.name.common
        .toLowerCase()
        .startsWith(this.state.busqueda); //||
      //value.name.official.toLowerCase().startsWith(this.state.busqueda)
      let condition =
        (matchName && value.region === this.state.region) ||
        (matchName && this.state.region === '');
      return condition;
    });
    //Convert the [key, value] pairs into an array of values
    var filteredCountries = filtered.map(([_, value]) => value);

    //Update State
    this.setState({
      filtered: filteredCountries,
    });
    //Return filtered countries
    return filteredCountries;
  };

  render() {
    return (
      <div className='App'>
        <Navbar />
        <Router>
          <Switch>
            {' '}
            {/* The Switch decides which component to show based on the current URL.*/}
            <Route exact path='/'>
              <div className='top-container'>
                <div className='search-filters'>
                  <SearchBar datosBusqueda={this.datosBusqueda} />
                  <Select
                    datosFiltro={this.datosFiltro}
                    width={200}
                    regions={this.state.regiones}
                  />
                </div>
              </div>
              <Countries
                countries={this.state.filtered}
                regiones={this.state.regiones}
                isFetch={this.state.isFetch}
                nombreActual={this.state.nombreActual}
              />
            </Route>
            <Route exact path='/country/:name'>
              <CountryDetails
                isFetch={this.state.isFetch}
                countries={this.state.paises}
              />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
