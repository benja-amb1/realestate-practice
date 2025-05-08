import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Inicio } from '../components/public/Inicio'
import { Nav } from '../components/public/Nav'
import { SobreNostros } from '../components/public/SobreNostros'
import { Propiedades } from '../components/public/Propiedades'
import { Contacto } from '../components/public/Contacto'
import { Footer } from '../components/public/Footer'
import { Propiedad } from '../components/public/Propiedad'
import PrivateRoute from '../components/private/PrivateRoute'
import { AdminLogin } from '../components/private/AdminLogin'
import { AuthProvider } from '../context/AuthProvider'
import AdminPage from '../components/private/AdminPage';
import { CrearPropiedad } from '../components/private/CrearPropiedad'
import { CrearVendedor } from '../components/private/CrearVendedor'
import { EditarPropiedad } from '../components/private/EditarPropiedad'
import { EditarVendedor } from '../components/private/EditarVendedor'


export const Routing = () => {
  return (
    <AuthProvider>
      <BrowserRouter>

        {/* NAV */}
        <Nav />

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/sobre-nosotros" element={<SobreNostros />} />
          <Route path="/propiedades" element={<Propiedades />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/propiedades/:id" element={<Propiedad />} />
          <Route path="*" element={<h1>Error 404, página no encontrada.</h1>} />

          {/*RUTAS PRIVADAS*/}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<PrivateRoute Component={AdminPage} />} />
          <Route path="/crear-propiedad" element={<PrivateRoute Component={CrearPropiedad} />} />
          <Route path="/crear-vendedor" element={<PrivateRoute Component={CrearVendedor} />} />
          <Route path="/editar-propiedad/:id" element={<PrivateRoute Component={EditarPropiedad} />} />
          <Route path="/editar-vendedor/:id" element={<PrivateRoute Component={EditarVendedor}/>}/>



        </Routes>



        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}
