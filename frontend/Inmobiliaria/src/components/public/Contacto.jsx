import React from 'react';

export const Contacto = () => {
  return (
    <div className="contacto-container">
      
      <form className="contacto-form">
      <h4>Por favor, complete el siguiente formulario.</h4>
        <div className="grid-dos-columnas">
          <div className="campo">
            <label className="contacto-label">Nombre</label>
            <input className="contacto-input" type="text" required placeholder="Nombre" />
          </div>
          <div className="campo">
            <label className="contacto-label">Apellido</label>
            <input className="contacto-input" type="text" required placeholder="Apellido" />
          </div>
        </div>

        <div className="campo">
          <label className="contacto-label">Email</label>
          <input className="contacto-input" type="email" required placeholder="Email" />
        </div>

        <div className="campo">
          <label className="contacto-label">Motivo De Consulta</label>
          <textarea className="contacto-textarea" placeholder="Consulta"></textarea>
        </div>

        <input type="submit" value="Enviar" className="contacto-boton" />
      </form>
    </div>
  );
};
