
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUp from './pages/SignUp'
import './App.css'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/register' element={<SignUp/>}/>
    </Routes>
    </>
  )
}

export default App
