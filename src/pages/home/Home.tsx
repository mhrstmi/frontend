import React from 'react'
import urls from '../../routes/urls'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Link to={urls.login}>
        login
      </Link>
    </div>
  )
}

export default Home