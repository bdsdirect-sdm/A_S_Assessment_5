import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UpdatePassword from './components/UpdatePassword'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import Signup from './components/Signup'
import Login from './components/Login'
import './App.css'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={ <Signup /> } />
        <Route path='/Login' element={ <Login /> } />
        <Route path='/Profile' element={ <Profile /> } />
        <Route path='/Dashboard' element={ <Dashboard /> } />
        <Route path='/Update' element={<UpdatePassword />} />
        
      </Routes>
    </Router>
    </>
  )
}

export default App
