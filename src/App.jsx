import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { SignUp } from './pages/SignUp'
import {Login} from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { Expenses } from './pages/Expenses'
import { Reports } from './pages/Reports'
import { Profile } from './pages/Profile'
import { ProtectedRoute } from './components/ProtectedRoute'
import { ForgotPassword } from './pages/ForgotPassword'
import { ResetPassword } from './pages/ResetPassword'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/reset-password/:token' element={<ResetPassword/>}/>
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        <Route path='/expenses' element={<ProtectedRoute><Expenses/></ProtectedRoute>}/>
        <Route path='/reports' element={<ProtectedRoute><Reports/></ProtectedRoute>}/>
        <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
      </Routes>
    </Router>
  )
}

export default App
