import { useEffect, useState } from "react";
import { axiosConfig } from "../../utils/axiosConfig";
import toast from "react-hot-toast";
import Spinner from "../ListaActividadesModal/Spinner/Spinner";
import ConfirmarPremiumModal from "./Modal/ConfirmarPremiumModal";
import { useDispatch, useSelector } from "react-redux";
import { mostrarSpinner, ocultarSpinner } from "../../store/slices/spinnerSlice";
import { guardarPremium, activarPremium } from "../../store/slices/premiumSlice";

const Premium = () => {
  const premium = useSelector(state => state.premium.esPremium);
  const [modalAbierto, setModalAbierto] = useState(false);

  const dispatch = useDispatch();


  // Plan actual del usuario (igual que en MenuUsuario)
  useEffect(() => {
    const obtenerPlan = async () => {
      dispatch(mostrarSpinner());
      try {
        const respuesta = await axiosConfig.get("/v1/usuarios/me");
        dispatch(guardarPremium(respuesta.data.premium || false));
      } catch (error) {
        console.error("Error al obtener el plan del usuario: ", error);
        toast.error("No se pudo cargar tu plan. Intentá nuevamente más tarde.");
      } finally {
        dispatch(ocultarSpinner());
      }
    }
    obtenerPlan();
  }, [dispatch]);


  const abrirModal = () => {
    setModalAbierto(true);
  }

  const cerrarModal = () => {
    setModalAbierto(false);
  }

  // PATCH /v1/usuarios/premium
  const hacersePremium = async () => {
    dispatch(mostrarSpinner());
    try {
      const respuesta = await axiosConfig.patch("/v1/usuarios/premium");
      // 200 "Usuario actualizado a premium con éxito"
      toast.success(respuesta.data?.message || "¡Listo! Tu cuenta ahora es Premium.");
      dispatch(activarPremium());
      cerrarModal();
    } catch (error) {
      console.error("Error al pasarse a premium: ", error);
      const mensaje = error.response?.data?.error;
      toast.error(mensaje || "No se pudo actualizar tu plan. Intentá nuevamente.");

      // 400 El usuario ya es premium - mostramos el estado de premium
      if (mensaje && mensaje.toLowerCase().includes("ya es premium")) {
        dispatch(activarPremium());
      }
      cerrarModal();
    } finally {
      dispatch(ocultarSpinner());
    }
  }


  return (
    <>
      <Spinner />
      <main className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h1 className="h2 fw-bold">
              Llevá tu entrenamiento al siguiente nivel
            </h1>
            <p className="text-muted">
              Inscribite a todas las actividades que quieras, sin límites.
            </p>
          </div>

          {premium ? (
            // Usuario que ya es premium
            <div className="card p-4 mx-auto text-center" style={{ maxWidth: "760px" }}>
              <div className="feature-icon mx-auto mb-3">
                <i className="bi bi-patch-check-fill"></i>
              </div>
              <h5 className="fw-bold mb-1">Ya sos Premium</h5>
              <p className="text-muted mb-0">
                Disfrutá de inscripciones ilimitadas en todas las actividades.
              </p>
            </div>
          ) : (
            <div className="row g-4 justify-content-center">
              {/* Plan actual */}
              <div className="col-md-6 col-lg-4">
                <div className="card plan-card h-100 p-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="fw-bold mb-0">Clásico</h5>
                    <span className="badge text-bg-secondary">
                      Tu plan actual
                    </span>
                  </div>
                  <div className="plan-price">Gratis</div>
                  <ul className="list-unstyled my-4">
                    <li className="mb-2">
                      <i className="bi bi-check2 text-success me-2"></i>Acceso a
                      todas las actividades
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check2 text-success me-2"></i>Hasta 4
                      inscripciones
                    </li>
                    <li className="mb-2 text-muted">
                      <i className="bi bi-x me-2"></i>Inscripciones ilimitadas
                    </li>
                  </ul>
                  <button className="btn btn-outline-secondary mt-auto" disabled>
                    Plan actual
                  </button>
                </div>
              </div>

              {/* Premium */}
              <div className="col-md-6 col-lg-4">
                <div className="card plan-card featured h-100 p-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="fw-bold mb-0">Premium</h5>
                    <span className="badge badge-premium">
                      <i className="bi bi-star-fill"></i> Recomendado
                    </span>
                  </div>
                  <div className="plan-price">Sin límites</div>
                  <ul className="list-unstyled my-4">
                    <li className="mb-2">
                      <i className="bi bi-check2 text-success me-2"></i>Acceso a
                      todas las actividades
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check2 text-success me-2"></i>
                      <strong>Inscripciones ilimitadas</strong>
                    </li>
                  </ul>
                  <button
                    type="button"
                    className="btn btn-brand mt-auto"
                    onClick={abrirModal}
                  >
                    Hacerme Premium
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <ConfirmarPremiumModal
        isOpen={modalAbierto}
        onRequestClose={cerrarModal}
        onConfirm={hacersePremium}
      />
    </>
  );
};

export default Premium;
