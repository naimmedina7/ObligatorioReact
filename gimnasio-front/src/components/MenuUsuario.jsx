import { Outlet, NavLink, useNavigate } from 'react-router';
import { useEffect, useState } from "react";
import { axiosConfig } from "../../utils/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { guardarPremium } from "../store/slices/premiumSlice";

const MenuUsuario = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [role, setRole] = useState("");
  // El plan vive en Redux: cuando Premium.jsx lo cambia, el badge se actualiza solo
  const premium = useSelector(state => state.premium.esPremium);
  const dispatch = useDispatch();
  // Si la imagen no carga (URL rota), guardamos esa URL para mostrar las iniciales
  const [avatarConError, setAvatarConError] = useState("");

  const mostrarImagen = avatarUrl && avatarUrl !== avatarConError;

  // Declarada antes del useEffect porque se usa adentro
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  useEffect(() => {
    // 1. Verificamos si existe el token en el localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    // 2. Función para obtener los datos del usuario enviando el token
    const obtenerDatosUsuario = async () => {
      try {
        const response = await axiosConfig.get("/v1/usuarios/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        const data = response.data;
        setName(data.name || "");
        setAvatarUrl(data.avatarUrl || "");
        setRole(data.role || "user");
        dispatch(guardarPremium(data.premium || false));

      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        // Si el token expiró o no es válido (401), cerramos sesión automáticamente
        if (error.response && error.response.status === 401) {
          cerrarSesion();
        }
      }
    };

    obtenerDatosUsuario();
  }, [navigate, dispatch]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/actividades">
            <i className="bi bi-lightning-charge-fill text-brand"></i> App<span>Gym</span>
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navPrivate">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navPrivate">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/actividades">Actividades</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/inscripciones">Mis inscripciones</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/premium">
                  <i className="bi bi-star-fill text-warning"></i> Premium
                </NavLink>
              </li>
              
              {/* Solo visible si el usuario tiene rol de admin */}
              {role === "admin" && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin">
                    <i className="bi bi-shield-lock"></i> Admin
                  </NavLink>
                </li>
              )}
            </ul>

            <div className="dropdown">
              <button type="button" className="btn btn-link p-0 d-flex align-items-center gap-2 text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown">
                <span className="avatar">
                  {mostrarImagen ? (
                    <img
                      src={avatarUrl}
                      alt={`Foto de ${name}`}
                      onError={() => setAvatarConError(avatarUrl)}
                    />
                  ) : (
                    name ? name.substring(0, 2).toUpperCase() : "JP"
                  )}
                </span>
                <span className="small">{name || "Cargando..."}</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li className="px-3 py-2">
                  <div className="fw-semibold">{name || "Usuario"}</div>
                  <span className={`badge ${premium ? "text-bg-warning" : "text-bg-secondary"}`}>
                    {premium ? "Plan Premium" : "Plan Clásico"}
                  </span>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <NavLink className="dropdown-item" to="/inscripciones">
                    <i className="bi bi-calendar-check me-2"></i>Mis inscripciones
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/premium">
                    <i className="bi bi-star me-2"></i>Mi plan
                  </NavLink>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button type="button" className="dropdown-item text-danger" onClick={cerrarSesion}>
                    <i className="bi bi-box-arrow-right me-2"></i>Cerrar sesión
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default MenuUsuario;