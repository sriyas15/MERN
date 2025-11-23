
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUp from './pages/SignUp'
import './App.css'
import HomePage from './pages/HomePage'
import AfterRegistraion from './pages/AfterRegistraion'
import FeedsPage from './pages/FeedsPage'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/userDetails' element={<AfterRegistraion/>}/>
      <Route path='/feeds' element={<FeedsPage/>}/>
    </Routes>
    </>
  )
}

export default App
