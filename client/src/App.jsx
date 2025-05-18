
import Navbar from './components/Navbar'
import Weather from './pages/Weather'
import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import SearchHistory from './pages/History'
import About from './pages/About'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
    <div className='bg-[url("./assets/background.jpg")] bg-cover bg-center bg-no-repeat min-h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-100'>
      <Navbar></Navbar>
      <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/weather-info' element={<Weather/>} />
          <Route path='/search-history' element={<SearchHistory />} />
          <Route path='/about' element={<About />} />
      </Routes>
      <Footer />

    </div>
    </>
  )
}

export default App