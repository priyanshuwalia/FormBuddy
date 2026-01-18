
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import CreateForm from './pages/CreateForm';
import Dashboard from './pages/Dashboard';
import ResponsePage from './pages/ResponsePage';
import PublishSuccessPage from './pages/PublishSuccess';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import UserHome from './pages/UserHome';


function App() {


  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<UserHome />} />



          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/create-form' element={<CreateForm />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/forms' element={<Dashboard />} />
          <Route path='/analytics' element={<Analytics />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/forms/:slug' element={<ResponsePage />} />
          <Route path='/forms/:slug/published' element={<PublishSuccessPage />} />

        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
