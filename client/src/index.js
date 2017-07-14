import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-less/semantic.less'
import { Segment } from 'semantic-ui-react'

ReactDOM.render(
  <Segment><h1>Hello, World!</h1></Segment>,
  document.getElementById('root')
)
