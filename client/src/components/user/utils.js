import Cookie from 'browser-cookies'
import Strings from '../../localization'


export function formatError(error) {
  return `\u2219 ${error} \n`
}

export function getUser() {
  return Cookie.get('token') && JSON.parse(localStorage.getItem('user'))
}

export function getDegree(degree) {
  const map = {
    BSC: Strings.bachelor,
    MSC: Strings.master,
    PHD: Strings.doctoral,
  }

  return map[degree]
}

export function getMajor(major) {
  const map = {
    CE: Strings.computerEngineering,
    CS: Strings.computerScience,
    IE: Strings.industrialEngineering,
    ME: Strings.mechanicalEngineering,
    MA: Strings.mathematics,
    PH: Strings.physics,
    CH: Strings.chemistry,
    CI: Strings.civil,
    MN: Strings.management,
    EC: Strings.economics,
  }

  return map[major]
}
