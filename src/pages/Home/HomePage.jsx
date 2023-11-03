import React from 'react'
import HomePageComponent from '../../components/HomePageComponent/HomePageComponent'
import { useSelector } from 'react-redux/es'

const HomePage = () => {
    const user = useSelector((state) => state.auth.user)
    
  return (
    <div>
        <h2>user: {user.email}</h2>
        <HomePageComponent />
    </div>
  )
}

export default HomePage