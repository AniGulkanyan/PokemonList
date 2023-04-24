import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import { apiMiddleware } from 'redux-api-middleware'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'

export default function setStore(initialState = {}) {
    const middlewares = [thunkMiddleware, apiMiddleware]

    if (process.env.NODE_ENV === 'development') {
        const loggerMiddleware = createLogger()
        middlewares.push(loggerMiddleware)
    }

    return configureStore({
        reducer: rootReducer,
        middleware: middlewares
    })
}
