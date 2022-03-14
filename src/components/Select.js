import React, { useRef } from 'react';

const SelectBox = (props) => {
  const { regions, width } = props;
  var unique = regions.filter(
    (region, index) => regions.indexOf(region) === index
  );

  const regionRef = useRef(null);

  const handleChange = (e) => {
    //Tomamos el valor del input
    var continente = regionRef.current.value;
    console.log(continente);
    //Y lo enviamos al componente principal
    props.datosFiltro(continente);
  };
  const populateSelect = () => {
    return unique.map((region, index) => {
      let notNull = region !== '' && region !== null;
      return (
        notNull && (
          <option key={`continente_${index}`} className='option' value={region}>
            {region}
          </option>
        )
      );
    });
  };
  return (
    <select
      onChange={handleChange}
      ref={regionRef}
      style={{ width: width + 'px' }}
      className='select-box'
      name='region'
      id='region'
    >
      <option className='option' value=''>
        Choose a Region
      </option>
      {populateSelect()}
    </select>
  );
};

export default SelectBox;
