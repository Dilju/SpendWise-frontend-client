import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { SignUp } from './pages/SignUp'
import {Login} from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { Expenses } from './pages/Expenses'
import { Reports } from './pages/Reports'
import { Profile } from './pages/Profile'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/expenses' element={<Expenses/>}/>
        <Route path='/reports' element={<Reports/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </Router>
  )
}

export default App
