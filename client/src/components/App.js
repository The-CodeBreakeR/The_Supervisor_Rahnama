import React from 'react'
import {Route, Link} from 'react-router-dom'

import AppHeader from './AppHeader'

export default function App() {
  return <div className='app'>
    <AppHeader/>
    <Route path="/test" component={AppHeader}/>
  </div>
}
