import RegisterPage from './pages/RegisterPage.tsx'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './components/MainLayout';
import LoginPage from './pages/LoginPage.tsx'
import LandingPage from './pages/LandingPage.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import CatalogPage from './pages/CatalogPage.tsx'
import ContentPage from './pages/ContentPage.tsx'

function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/topic/:slug" element={<ContentPage />} />
        </Route>
      </Route>
    </Routes>


  )
}


export default App
