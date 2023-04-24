import React from 'react'
import TextConstants from "../../constants/TextConstants";
import "./styles.css"

const Search = ({ onChange, value }: any) => (
  <input
     className="search"
    type="text"
    onChange={onChange}
    value={value}
    placeholder={TextConstants.INPUTS.FIND_POKEMON_BY_NAME}
    autoFocus
  />
)

 export default Search