import { Link } from "react-router";


export const Login = () => {
    // const navigate = useNavigate();

    return (
        <>
            <main className="auth-wrapper">
                <div className="container">
                    <div className="card auth-card p-4 p-md-5">
                        <div className="text-center mb-4">
                            <div className="feature-icon mb-3"><i className="bi bi-box-arrow-in-right"></i></div>
                            <h1 className="h3 fw-bold">Bienvenido de nuevo</h1>
                            <p className="text-muted mb-0">Ingresá para ver tus actividades</p>
                        </div>

                        {/* <!-- Estado de error: respuesta 400 "Credenciales invalidas" --> */}
                        <div className="alert alert-danger d-flex align-items-center gap-2 py-2 small" role="alert">
                            <i className="bi bi-exclamation-circle"></i> Credenciales inválidas
                        </div>

                        <form>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Usuario</label>
                                <div className="input-group">
                                    <span className="input-group-text"><i className="bi bi-person"></i></span>
                                    <input type="text" className="form-control" id="username" placeholder="tu_usuario" minLength="3" maxLength="20" required/>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label">Contraseña</label>
                                <div className="input-group">
                                    <span className="input-group-text"><i className="bi bi-lock"></i></span>
                                    <input type="password" className="form-control" id="password" placeholder="••••••" minLength="3" maxLength="20" required/>
                                </div>
                            </div>
                            {/* <!-- En la maqueta el botón navega a actividades --> */}
                            <button type="submit" className="btn btn-brand w-100 py-2">Iniciar sesión</button>
                        </form>

                        <p className="text-center text-muted small mt-4 mb-0">
                            ¿No tenés cuenta?<Link to="/registro" className="text-brand fw-semibold">Registrate</Link>
                            {/* ¿No tenés cuenta? <a href="/registro" className="text-brand fw-semibold">Registrate</a> */}
                        </p>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Login;