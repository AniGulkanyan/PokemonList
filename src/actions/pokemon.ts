import { RSAA } from 'redux-api-middleware'
import { createAction } from '@reduxjs/toolkit'

export const getPokemonsRequest = createAction('GET_POKEMONS_REQUEST')
export const getPokemonsSuccess = createAction('GET_POKEMONS_SUCCESS')
export const getPokemonsFailure = createAction('GET_POKEMONS_FAILURE')

interface GetPokemonsOptions {
    limit?: number
}

export const getPokemons = (page: number = 1, options: GetPokemonsOptions = {}) => (dispatch: any) => {
    const { limit = 20 } = options;
    const offset = (page - 1) * limit;

    return dispatch({
        [RSAA]: {
            endpoint: `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`,
            method: 'GET',
            types: [
                getPokemonsRequest.type,
                getPokemonsSuccess.type,
                getPokemonsFailure.type
            ]
        }
    })
}


