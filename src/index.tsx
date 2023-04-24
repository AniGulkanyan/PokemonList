import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import setStore from './store/configure-store'
import Page from "./components/pokemon-list/page";

const store = setStore()

render(
  <Provider store={store}>
    <Page />
  </Provider>,
  document.getElementById('root')
)
