import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';


export const AdminLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {setIsAuthenticated} = useContext(AuthContext);

    const login = async(e) => {
        e.preventDefault();
        setError(null);

        try {
            const peticion = await fetch('http://localhost:3900/api/vendedores/login', {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            })

            const data = await peticion.json();

            if(!peticion.ok){throw new Error(data.message || 'Error en la autenticación')};

            localStorage.setItem('token', data.token);
            setIsAuthenticated(true);
            navigate('/admin')

        } catch (error) {
            setError(error.message)
        }

    }

  return (
    <div className="admin-login-container">
      <form className="admin-login-form" onSubmit={login}>
        <label>Email</label>
        <input type="email" id="email" name="email" value={email} placeholder="Email"  onChange={(e) => setEmail(e.target.value)}/>

        <label>Contraseña</label>
        <input type="password" id="password" name="password" value={password} placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />

        {error && <p className='error-message'>{error}</p>}

        <button type="submit" className="admin-login-button">Iniciar sesión</button>
      </form>
    </div>
  );
};
