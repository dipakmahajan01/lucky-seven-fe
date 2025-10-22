
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LuckySevenGame from './component/ui/LuckySevenGame'
import Signup from './component/ui/Signup'
import Login from './component/ui/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/game" element={<LuckySevenGame />} />
        <Route path="/" element={<Navigate to="/signup" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
