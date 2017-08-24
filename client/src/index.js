import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import 'semantic-ui-less/semantic.less'
import 'react-datepicker2/dist/react-datepicker2.min.css'
import App from './components/App'

ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, document.getElementById('root'))
