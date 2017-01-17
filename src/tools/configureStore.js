/**
 * Created by timur on 1/17/17.
 */

import { createStore } from 'redux'
import todos from '../reducers/todos'
// import { apiURL } from './globals'

const configureStore = () => createStore(todos)

export default configureStore
