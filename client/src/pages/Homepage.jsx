import React from 'react'
import CurrentWeather from '../components/CurentWeather'
import Activities from '../components/Activities'
const Homepage = () => {
  return (
    <div>
     <CurrentWeather></CurrentWeather>
    
        <div className=' w-[95%] mx-auto'>
            <Activities />
        </div>
     
        
    </div>
  )
}

export default Homepage