import React, { useState, useEffect } from 'react';
import hardtack from 'hardtack';
import ga from '../../utils/ga';
import Pokemon from "../pokemon-item/PokemonItem";
import Search from '../search/Search';
import TextConstants from "../../constants/TextConstants";
import "./styles.css"
import Pagination from "../pagination/Pagination";
import Modal from "../modal";

const PokemonList = ({ getPokemons, collection, isFetched }: any) => {
  const [searchString, setSearchString] = useState('');
  const [pokemonsIds, setPokemonsIds] = useState<string[]>(Object.keys(collection));
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 20;
  const [isOpen, setIsOpen] = useState(false);
    const [description, setDescription] = useState();

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  }

  useEffect(() => {
    ga.pageview('/');
  }, []);

  useEffect(() => {
    const searchString = hardtack.get('searchString');

    if (Object.keys(collection).length > 0) {
      if (!searchString) {
        setPokemonsIds(Object.keys(collection) as string[]);
      }
    }
  }, [collection]);

const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
  const searchString = event.target.value.trim().toLowerCase();
  setSearchString(searchString);

  const filteredPokemonsIds = Object.keys(collection).filter(pokemonId => {
    const pokemon = collection[pokemonId];
    return pokemon.name.toLowerCase().includes(searchString);
  });

  setPokemonsIds(filteredPokemonsIds);
}


    const handleItemClick = async (pokemon: any) => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/ability/${pokemon.id}`);
        const data = await response.json();
        console.log(data);
        setDescription(data.effect_entries[1])
      } catch (error) {
        console.error(error);
      }
      setIsOpen(true)
    };


const handleRenderItem = (index: number) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pagePokemonsIds = pokemonsIds.slice(startIndex, endIndex);

  if (index >= pagePokemonsIds.length) {
    return null;
  }

  const pokemonId = pagePokemonsIds[index];
  const pokemon = collection[pokemonId];
console.log(pokemon, '22')
  return (
    <div key={pokemon.id} onClick={() => handleItemClick(pokemon)}>
      <Pokemon pokemon={pokemon} />
    </div>
  );
}

  useEffect(() => {
    const totalItems = Object.keys(collection).length;
    const newTotalPages = Math.ceil(totalItems / itemsPerPage);
    setTotalPages(newTotalPages);
  }, [collection]);

  useEffect(() => {
    getPokemons().then((action: any) => {
      if (action.error) {
        return setError(action.payload.message);
      }
    });
  }, []);

  const handleCloseModal = () => {
      setIsOpen(!isOpen)
  }

  return (
    <>
      <div className="page" style={{ position: "relative" }}>
        <h1 style={{ display: "flex", justifyContent: "center"}}>
          {TextConstants.TITLES.POKEMON_LIST}
        </h1>
        {error && <div className="page__error">{error}</div>}
        <div className="page__search" style={{ display: "flex", justifyContent: "center" }}>
          <Search onChange={handleSearch} />
        </div>
        {isFetched ? (
          <h1>Loading...</h1>
        ) : null}
      </div>
      <Pagination
      data={pokemonsIds}
      itemsPerPage={10}
      renderItem={handleRenderItem}
       onPageChange={handlePageChange} />
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
      <div style={{
      position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "0 30px 20px 30px",
        backgroundColor: "#ffffff",
        border: "1px solid lightGrey",
        zIndex: "3444"
      }}>
        <h4>{TextConstants.TITLES.POKEMON}</h4>
        <div>{description && JSON.stringify(description)}</div>
        </div>
        </Modal>
    </>
  );
};

export default PokemonList;
