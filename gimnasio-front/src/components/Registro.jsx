export const Registro = () => {
  return (
   <main className="auth-wrapper">
    <div className="container">
      <div className="card auth-card p-4 p-md-5">
        <div className="text-center mb-4">
          <h1 className="h3 fw-bold">Creá tu cuenta</h1>
          <p className="text-muted mb-0">Empezá con el plan Clásico, gratis</p>
        </div>

        <form encType="multipart/form-data">
          {/* <!-- Avatar (campo "imagen", se sube a Cloudinary) --> */}
          <div className="text-center mb-4">
            <div className="avatar avatar-lg mb-2"><i className="bi bi-camera"></i></div>
            <div>
              <label htmlFor="imagen" className="btn btn-outline-brand btn-sm">Subir foto de perfil</label>
              <input type="file" className="d-none" id="imagen" name="imagen" accept="image/*" required />
            </div>
            <div className="form-text">Obligatoria. JPG o PNG.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre</label>
            <input type="text" className="form-control" id="name" name="name" placeholder="Juan Pérez" minLength="3" maxLength="20" required />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Usuario</label>
            <input type="text" className="form-control" id="username" name="username" placeholder="juanperez" minLength="3" maxLength="20" required />
            {/* <!-- Estado de error: 400 "Nombre de usuario ya en uso" --> */}
            <div className="form-text text-danger"><i className="bi bi-exclamation-circle"></i> Nombre de usuario ya en uso</div>
          </div>
          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">Teléfono</label>
            <input type="tel" className="form-control" id="telefono" name="telefono" placeholder="+54 9 11 1234-5678" maxLength="20" required />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" className="form-control" id="password" name="password" minLength="3" maxLength="20" required />
            <div className="form-text">Entre 3 y 20 caracteres, solo letras y números.</div>
          </div>

          <button type="submit" className="btn btn-brand w-100 py-2">Crear cuenta</button>
        </form>

        <p className="text-center text-muted small mt-4 mb-0">
          ¿Ya tenés cuenta? <a href="/login" className="text-brand fw-semibold">Iniciá sesión</a>
        </p>
      </div>
    </div>
  </main>
  )
}

export default Registro;
