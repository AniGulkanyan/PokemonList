import { RSAA } from 'redux-api-middleware'
import { createAction } from '@reduxjs/toolkit'

export const getPokemonsRequest = createAction('GET_POKEMONS_REQUEST')
export const getPokemonsSuccess = createAction('GET_POKEMONS_SUCCESS')
export const getPokemonsFailure = createAction('GET_POKEMONS_FAILURE')

interface GetPokemonsOptions {
    limit?: number
}

export const getPokemons = (options: GetPokemonsOptions = {}) => (dispatch: any) => {
    const { limit = 784 } = options

    return dispatch({
        [RSAA]: {
            endpoint: `https://pokeapi.co/api/v2/pokemon/?limit=100`,
            method: 'GET',
            types: [
                getPokemonsRequest.type,
                getPokemonsSuccess.type,
                getPokemonsFailure.type
            ]
        }
    })
}

