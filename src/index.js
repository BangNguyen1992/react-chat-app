import ReactDOM from 'react-dom'
import React from 'react'
import App from './App'
import { RouterProvider } from 'react-router5'

import './index.css';
import createRouter from './config/create-router';
import * as serviceWorker from './serviceWorker';
// import emails from './data'


const router = createRouter(true)

router.start(() => {
  ReactDOM.render((
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  ), document.getElementById('root'))
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
