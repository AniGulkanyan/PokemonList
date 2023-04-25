import { RSAA } from 'redux-api-middleware'
import { createAction } from '@reduxjs/toolkit'

export const getPokemonsDescriptionRequest = createAction('GET_POKEMONS_DESCRIPTION_REQUEST')
export const getPokemonsDescriptionSuccess = createAction('GET_POKEMONS_DESCRITION_SUCCESS')
export const getPokemonsDescriptionFailure = createAction('GET_POKEMONS_DESCRIPTION_FAILURE')

interface GetPokemonsOptions {
    id?: number
}

export const getPokemonsDescription = (options: GetPokemonsOptions = {}) => (dispatch: any) => {
  const { id } = options;

    return dispatch({
        [RSAA]: {
            endpoint: `https://pokeapi.co/api/v2/ability/{id or name}/`,
            method: 'GET',
            types: [
                getPokemonsDescriptionRequest.type,
                getPokemonsDescriptionSuccess.type,
                getPokemonsDescriptionFailure.type
            ]
        }
    })
}


