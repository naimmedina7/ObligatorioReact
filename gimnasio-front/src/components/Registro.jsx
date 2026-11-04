import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import registroSchema from "../validations/registroSchema";
import { axiosConfig } from "../../utils/axiosConfig";

const Registro = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(registroSchema),
    mode: "onChange",
    defaultValues: {
      imagen: null,
      name: "",
      username: "",
      telefono: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  // Error de la API "Nombre de usuario ya en uso", se muestra debajo del campo
  const [errorUsuario, setErrorUsuario] = useState("");
  // URL temporal para mostrar la foto elegida antes de subirla
  const [vistaPrevia, setVistaPrevia] = useState("");

  const onSubmit = async (data) => {
    setError("");
    setErrorUsuario("");

    // Con imagen hay que mandar FormData (multipart), no JSON
    const formData = new FormData();
    formData.append("imagen", data.imagen);
    formData.append("name", data.name);
    formData.append("username", data.username);
    formData.append("telefono", data.telefono);
    formData.append("password", data.password);

    try {
      await axiosConfig.post("/v1/auth/signup", formData, {
        // axiosConfig manda JSON por defecto: así axios no convierte el FormData a JSON
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (requestError) {
      console.error("Error al registrarse:", requestError);
      const mensaje = requestError.response?.data?.message;
      const texto = Array.isArray(mensaje) ? mensaje.join(", ") : mensaje;

      // 400 "Nombre de usuario ya en uso": se muestra debajo del campo usuario
      if (texto && texto.toLowerCase().includes("usuario")) {
        setErrorUsuario(texto);
      } else {
        setError(texto || "No se pudo crear la cuenta. Intentá nuevamente.");
      }
      return; // Si no se creó la cuenta, no intentamos el login
    }

    // Autologin: el mismo POST que hace Login.jsx, con los datos recién cargados
    try {
      const response = await axiosConfig.post("/v1/auth/login", {
        username: data.username,
        password: data.password,
      });

      if (!response.data.token) {
        throw new Error("La respuesta de inicio de sesión no incluye un token.");
      }

      localStorage.setItem("token", response.data.token);
      reset();
      setVistaPrevia("");
      toast.success("¡Cuenta creada! Bienvenido");
      navigate("/actividades");
    } catch (loginError) {
      // La cuenta sí se creó: solo falló el login automático
      console.error("Error en el login automático:", loginError);
      toast.success("¡Cuenta creada! Iniciá sesión para continuar");
      navigate("/login");
    }
  };

  return (
    <main className="auth-wrapper">
      <div className="container">
        <div className="card auth-card p-4 p-md-5">
          <div className="text-center mb-4">
            <h1 className="h3 fw-bold">Creá tu cuenta</h1>
            <p className="text-muted mb-0">Empezá con el plan Clásico, gratis</p>
          </div>

          {error && (
            <div
              className="alert alert-danger d-flex align-items-center gap-2 py-2 small"
              role="alert"
            >
              <i className="bi bi-exclamation-circle"></i> {error}
            </div>
          )}

          {/* Avatar (campo "imagen", se sube a Cloudinary) */}
          <div className="text-center mb-4">
            <div className="avatar avatar-lg mb-2">
              {vistaPrevia ? (
                <img src={vistaPrevia} alt="Vista previa de la foto de perfil" />
              ) : (
                <i className="bi bi-camera"></i>
              )}
            </div>
            <div>
              <label htmlFor="imagen" className="btn btn-outline-brand btn-sm">
                {vistaPrevia ? "Cambiar foto" : "Subir foto de perfil"}
              </label>
              <Controller
                control={control}
                name="imagen"
                render={({ field }) => (
                  // Un input file no tiene "value" controlado: guardamos el archivo elegido
                  <input
                    id="imagen"
                    type="file"
                    className="d-none"
                    accept="image/png, image/jpeg"
                    name={field.name}
                    ref={field.ref}
                    onBlur={field.onBlur}
                    onChange={(e) => {
                      const archivo = e.target.files[0] || null;
                      field.onChange(archivo);
                      // URL temporal para ver la foto en el círculo
                      setVistaPrevia(archivo ? URL.createObjectURL(archivo) : "");
                    }}
                  />
                )}
              />
            </div>
            {errors.imagen ? (
              <div className="small text-danger mt-1">{errors.imagen.message}</div>
            ) : (
              <div className="form-text">Obligatoria. JPG o PNG.</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nombre
            </label>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <input
                  {...field}
                  id="name"
                  type="text"
                  placeholder="Juan Pérez"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                />
              )}
            />
            {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
          </div>

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
                    placeholder="juanperez"
                    className={`form-control ${errors.username || errorUsuario ? "is-invalid" : ""}`}
                    onChange={(e) => {
                      field.onChange(e);
                      // Si cambia el usuario, se borra el error "ya en uso"
                      setErrorUsuario("");
                    }}
                  />
                )}
              />
              {(errors.username || errorUsuario) && (
                <div className="invalid-feedback">
                  <i className="bi bi-exclamation-circle"></i> {errors.username?.message || errorUsuario}
                </div>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">
              Teléfono
            </label>
            <div className="input-group has-validation">
              <span className="input-group-text">
                <i className="bi bi-telephone"></i>
              </span>
              <Controller
                control={control}
                name="telefono"
                render={({ field }) => (
                  <input
                    {...field}
                    id="telefono"
                    type="tel"
                    placeholder="+598 99 123 456"
                    className={`form-control ${errors.telefono ? "is-invalid" : ""}`}
                  />
                )}
              />
              {errors.telefono && (
                <div className="invalid-feedback">{errors.telefono.message}</div>
              )}
            </div>
          </div>

          <div className="mb-3">
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
              {errors.password ? (
                <div className="invalid-feedback">{errors.password.message}</div>
              ) : null}
            </div>
            {!errors.password && (
              <div className="form-text">Entre 3 y 20 caracteres, solo letras y números.</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="form-label">
              Confirmar contraseña
            </label>
            <div className="input-group has-validation">
              <span className="input-group-text">
                <i className="bi bi-lock-fill"></i>
              </span>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field }) => (
                  <input
                    {...field}
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Repetí tu contraseña"
                    className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                  />
                )}
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword.message}</div>
              )}
            </div>
          </div>

          <button
            type="button"
            className="btn btn-brand w-100 py-2"
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
          </button>

          <p className="text-center text-muted small mt-4 mb-0">
            ¿Ya tenés cuenta?{" "}
            <Link to="/login" className="text-brand fw-semibold">
              Iniciá sesión
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Registro;
