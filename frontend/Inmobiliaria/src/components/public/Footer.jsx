import React from 'react';
import { NavLink } from 'react-router-dom';

export const Footer = () => {
    return (
        <>
            <footer className='footer-nav'>
                {/* Sección de Navegación */}
                <div className="footer-links">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Inicio</NavLink>
                    <NavLink to="/sobre-nosotros" className={({ isActive }) => isActive ? 'active' : ''}>Sobre Nosotros</NavLink>
                    <NavLink to="/propiedades" className={({ isActive }) => isActive ? 'active' : ''}>Propiedades</NavLink>
                    <NavLink to="/contacto" className={({ isActive }) => isActive ? 'active' : ''}>Contacto</NavLink>
                </div>

                {/* Sección de Redes Sociales */}
                <div className="footer-social">
                    <div className='icon-container'>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <svg className="footer-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokelinecap="round" strokelinejoin="round" width={48} height={48} strokeWidth={0.75}>
                                <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z"></path>
                                <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                                <path d="M16.5 7.5l0 .01"></path>
                            </svg>
                            Instagram
                        </a>
                    </div>


                    <div className='icon-container'>
                        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                            <svg className="footer-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokelinecap="round" strokelinejoin="round" width={48} height={48} strokeWidth={0.75}>
                                <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9"></path>
                                <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1"></path>
                            </svg>
                            WhatsApp
                        </a>
                    </div>


                    <div className='icon-container'>
                        <a href="mailto:correo@example.com">
                            <svg className="footer-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokelinecap="round" strokelinejoin="round" width={48} height={48} strokeWidth={0.75}>
                                <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path>
                                <path d="M3 7l9 6l9 -6"></path>
                            </svg>
                            Email
                        </a>
                    </div>


                    <div className='icon-container'>
                        <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                            <svg className="footer-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokelinecap="round" strokelinejoin="round" width={48} height={48} strokeWidth={0.75}>
                                <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
                            </svg>
                            X
                        </a>
                    </div>

                </div>
            </footer>
            <p className='p-footer'>Inombiliaria Pedro. Todos los derechos reservados &copy;.</p>
        </>
    );
};
