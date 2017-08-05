import React from 'react'
import Cookie from 'browser-cookies'

export function formatError(error) {
  return `\u2219 ${error} \n`
}

export function getUser() {
  return Cookie.get('token') && JSON.parse(localStorage.getItem('user'))
}
