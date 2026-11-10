import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "../validations/loginSchema";
import { axiosConfig } from "../utils/axiosConfig";

const Login = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    setError("");

    try {
      const response = await axiosConfig.post("/v1/auth/login", data);

      if (!response.data.token) {
        throw new Error("La respuesta de inicio de sesión no incluye un token.");
      }

      localStorage.setItem("token", response.data.token);
      reset();
      navigate("/actividades");
    } catch (requestError) {
      console.error("Error al iniciar sesión:", requestError);
      setError(
        requestError.response?.data?.message ||
          "No se pudo iniciar sesión. Verificá tus credenciales e intentá nuevamente.",
      );
    }
  };

  return (
    <main className="auth-wrapper">
      <div className="container">
        <div className="card auth-card p-4 p-md-5">
          {error && (
            <div
              className="alert alert-danger d-flex align-items-center gap-2 py-2 small"
              role="alert"
            >
              <i className="bi bi-exclamation-circle"></i> {error}
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Usuario
            </label>
            <div className="input-group has-validation">
              <span className="input-group-text">
                <i className="bi bi-person"></i>
              </span>
              <Controller
                control={control}
                name="username"
                render={({ field }) => (
                  <input
                    {...field}
                    id="username"
                    type="text"
                    placeholder="tu_usuario"
                    className={`form-control ${errors.username ? "is-invalid" : ""}`}
                  />
                )}
              />
              {errors.username && (
                <div className="invalid-feedback">{errors.username.message}</div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <div className="input-group has-validation">
              <span className="input-group-text">
                <i className="bi bi-lock"></i>
              </span>
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <input
                    {...field}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  />
                )}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
              </button>
              {errors.password && (
                <div className="invalid-feedback">{errors.password.message}</div>
              )}
            </div>
          </div>

          <button
            type="button"
            className="btn btn-brand w-100 py-2"
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Ingresando..." : "Iniciar sesión"}
          </button>

          <p className="text-center text-muted small mt-4 mb-0">
            ¿No tenés cuenta?{" "}
            <Link to="/registro" className="text-brand fw-semibold">
              Registrate
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
