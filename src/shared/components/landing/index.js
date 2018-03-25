import React from 'react'

const Landing = () => (<div>Landing</div>)


Landing.preload = ({ match, store }) => { // eslint-disable-line no-unused-vars
  console.log('SSR data preload') // eslint-disable-line no-console
  return Promise.resolve()
}

export default Landing
