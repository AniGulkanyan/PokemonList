import React, { useState, useEffect } from 'react';
import hardtack from 'hardtack';
import ga from '../../utils/ga';
import Pokemon from "../pokemon-item/PokemonItem";
import Search from '../search/Search';
import TextConstants from "../../constants/TextConstants";
import DropDown from "../dropdown/DropDown";
import "./styles.css"
import Pagination from "../pagination/Pagination";

const PokemonList = ({ getPokemons, collection, isFetched }: any) => {
  const [searchString, setSearchString] = useState('');
  const [pokemonsIds, setPokemonsIds] = useState<string[]>(Object.keys(collection));
  const [error, setError] = useState(null);

  useEffect(() => {
    ga.pageview('/');
  }, []);

  useEffect(() => {
    const searchString = hardtack.get('searchString');

    if (Object.keys(collection).length > 0) {
      if (!searchString) {
        setPokemonsIds(Object.keys(collection) as string[]);
      } else {
        const filteredPokemonsIds = Object.keys(collection).filter(
          (pokemonId) => {
            const pokemon = collection[pokemonId];
            return pokemon.name.includes(searchString);
          }
        );
        setPokemonsIds(filteredPokemonsIds);
        setSearchString(searchString);
      }
    }
  }, [collection]);

  const handleSearch = (event: any) => {
    const value = event.currentTarget.value.toLowerCase().trim();
    hardtack.set('searchString', value, {
      maxAge: 31536000
    });

    if (value === '') {
      setPokemonsIds(Object.keys(collection));
      setSearchString(value);
    } else {
      const filteredPokemonsIds = Object.keys(collection).filter(pokemonId => {
        const pokemon = collection[pokemonId];
        return pokemon.name.includes(value);
      });
      setPokemonsIds(filteredPokemonsIds);
      setSearchString(value);
    }
  }

  const handleRenderItem = () => {
    console.log('here');
  }
  // const handleSelect = () => {
  //   console.log('here');
  // }

  // const options = [
  //   { label: "Option 1", value: "option1" },
  //   { label: "Option 2", value: "option2" },
  //   { label: "Option 3", value: "option3" },
  // ];

  const pokemons = pokemonsIds.map(pokemonId => {
    const pokemon = collection[pokemonId];
    return (
      <div className="pokemons__item" key={pokemon.id}>
        <Pokemon pokemon={pokemon} />
      </div>
    );
  });

  console.log(pokemons, 'pokemons')
  console.log(pokemonsIds, 'pokemonsIds')
  useEffect(() => {
    getPokemons().then((action: any) => {
      if (action.error) {
        return setError(action.payload.message);
      }
    });
  }, []);

  return (
    <>
      {/*<DropDown options={options} onSelect={handleSelect} />*/}
      <div className="page" style={{ position: "relative" }}>
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          {TextConstants.TITLES.POKEMON_LIST}
        </h1>
        {error && <div className="page__error">{error}</div>}
        <div className="page__search" style={{ display: "flex", justifyContent: "center" }}>
          <Search onChange={handleSearch} value={searchString} />
        </div>
        {isFetched ? (
          <h1>Loading...</h1>
        ) : (
          <div className="container" >{pokemons}</div>
        )}
      </div>
      <Pagination data={pokemonsIds} itemsPerPage={10} renderItem={handleRenderItem} />
    </>
  );
};

export default PokemonList;
