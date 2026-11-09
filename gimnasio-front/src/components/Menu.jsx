import { Outlet, NavLink } from 'react-router'

const Menu = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <NavLink className="navbar-brand" to="/"><i className="bi bi-lightning-charge-fill text-brand"></i> App<span>Gym</span></NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navPublic">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navPublic">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item"><NavLink className="nav-link active" to="/">Inicio</NavLink></li>
                            {/* <li className="nav-item"><NavLink className="nav-link" to="/planes">Planes</NavLink></li> */}
                        </ul>
                        <div className="d-flex gap-2">
                            <NavLink to="/login" className="btn btn-outline-light btn-sm">Iniciar sesión</NavLink>
                            <NavLink to="/registro" className="btn btn-brand btn-sm">Registrarme</NavLink>
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    );
}

export default Menu;