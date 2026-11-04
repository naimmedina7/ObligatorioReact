import { useState } from "react";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [campoUser, setCampoUser] = useState("");
  const [campoPass, setCampoPass] = useState("");

  const ingresar = async () => {
    setError(false);
    setLoading(true);

    try {
      const response = await fetch(
        "https://api-gym-brown.vercel.app/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: campoUser,
            password: campoPass,
          }),
        },
      );

      if (!response.ok) {
        setError(true);
        return;
      }

      const data = await response.json();
      if (!data.token) {
        throw new Error(
          "La respuesta de inicio de sesión no incluye un token.",
        );
      }

      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (requestError) {
      console.error("Error al iniciar sesión:", requestError);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="auth-wrapper">
        <div className="container">
          <div className="card auth-card p-4 p-md-5">
            {/* <div className="text-center mb-4">
              <div className="feature-icon mb-3">
                <i className="bi bi-box-arrow-in-right"></i>
              </div>
              <h1 className="h3 fw-bold">Bienvenido de nuevo</h1>
              <p className="text-muted mb-0">
                Ingresá para ver tus actividades
              </p>
            </div> */}

            {/* <!-- Estado de error: respuesta 400 "Credenciales invalidas" --> */}
            {/* <div
              className="alert alert-danger d-flex align-items-center gap-2 py-2 small"
              role="alert"
            >
              <i className="bi bi-exclamation-circle"></i> Credenciales
              inválidas
            </div> */}

            <div>
              {error && (
                <div className="alert alert-danger py-2 small" role="alert">
                  No se pudo iniciar sesión. Verificá tus credenciales e intentá
                  nuevamente.
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Usuario
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-person"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="tu_usuario"
                    minLength="3"
                    maxLength="20"
                    required
                    value={campoUser}
                    onChange={(event) => setCampoUser(event.target.value)}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="••••••"
                    minLength="3"
                    maxLength="20"
                    required
                    value={campoPass}
                    onChange={(event) => setCampoPass(event.target.value)}
                  />
                </div>
              </div>
              {/* <!-- En la maqueta el botón navega a actividades --> */}
              <button
                type="button"
                className="btn btn-brand w-100 py-2"
                onClick={ingresar}
                disabled={loading || !campoUser.trim() || !campoPass.trim()}
              >
                {loading ? "Ingresando..." : "Iniciar sesión"}
              </button>
            </div>

            <p className="text-center text-muted small mt-4 mb-0">
              ¿No tenés cuenta?
              <Link to="/registro" className="text-brand fw-semibold">
                Registrate
              </Link>
              {/* ¿No tenés cuenta? <a href="/registro" className="text-brand fw-semibold">Registrate</a> */}
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
