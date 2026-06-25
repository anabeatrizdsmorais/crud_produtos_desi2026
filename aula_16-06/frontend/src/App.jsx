import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Registrar from './pages/Registrar.jsx'
import Perfil from './pages/Perfil.jsx'

export default function App() {
  return (
    // BrowserRouter: habilita o sistema de rotas baseado na URL do navegador
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas: qualquer um pode acessar */}
        <Route path="/login"     element={<Login />} />
        <Route path="/registrar" element={<Registrar />} />

        {/* Rota protegida: a proteção real está dentro do componente Perfil */}
        <Route path="/perfil" element={<Perfil />} />

        {/* Qualquer outra URL redireciona automaticamente para o login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}
