import { connect } from 'react-redux'
import {getPokemons} from "../../actions/pokemon";
import PokemonList from "./PokemonList";

function mapStateToProps(state: { pokemons: { collection: any; }; }) {
  const { collection } = state.pokemons

  return {
    collection
  }
}

const mapDispatchToProps = {
  getPokemons
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonList)
