import { useEffect, useState } from "react";
import { axiosConfig } from "../../../utils/axiosConfig";
import toast from "react-hot-toast";
import Spinner from "../ListaActividadesModal/Spinner/Spinner";
import ActividadModal from "./Modal/ActividadModal";
import CategoriaModal from "./Modal/CategoriaModal";
import EliminarModal from "./Modal/EliminarModal";
import { useDispatch, useSelector } from "react-redux";
import { mostrarSpinner, ocultarSpinner } from "../../store/slices/spinnerSlice";
import { guardarActividades, editarActividad, eliminarActividad } from "../../store/slices/actividadesSlice";
import { guardarCategorias, editarCategoria, eliminarCategoria } from "../../store/slices/categoriasSlice";
// Gráfica circular, igual que en Clima.jsx de clase
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const coloresGrafica = [
  'rgba(255, 90, 31, 0.7)',
  'rgba(54, 162, 235, 0.7)',
  'rgba(255, 206, 86, 0.7)',
  'rgba(75, 192, 192, 0.7)',
  'rgba(153, 102, 255, 0.7)',
  'rgba(255, 99, 132, 0.7)',
  'rgba(255, 159, 64, 0.7)',
];

// La API manda la fecha en UTC ("2026-11-25T00:00:00.000Z").
// timeZone: "UTC" evita que en Uruguay se muestre un día antes.
const formatearFecha = (fecha) =>
  fecha
    ? new Date(fecha).toLocaleDateString("es-UY", { timeZone: "UTC" })
    : "-";


const Admin = () => {

  // Listas en Redux
  const actividades = useSelector(state => state.actividades.listaActividades);
  const categorias = useSelector(state => state.categorias.listaCategorias);

  // Pestaña activa: "actividades" | "categorias"
  const [pestania, setPestania] = useState("actividades");

  // Paginación y filtro de actividades
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [totalActividades, setTotalActividades] = useState(0);
  const [filtroCategoria, setFiltroCategoria] = useState("");

  // Al crear algo, sumamos 1 para que el useEffect vuelva a pedir la lista
  const [recargarActividades, setRecargarActividades] = useState(0);
  const [recargarCategorias, setRecargarCategorias] = useState(0);

  // Qué modal está abierto: null | "actividad" | "categoria" | "eliminarActividad" | "eliminarCategoria"
  const [modalAbierto, setModalAbierto] = useState(null);
  // La actividad o categoría elegida (null = crear una nueva)
  const [seleccion, setSeleccion] = useState(null);
  // Error de la API que se muestra dentro del modal (ej: 409 nombre repetido)
  const [errorApi, setErrorApi] = useState("");

  // Para la gráfica: cuántas actividades tiene cada categoría, ej: { c1: 5, c2: 1 }
  const [actividadesPorCategoria, setActividadesPorCategoria] = useState({});

  const dispatch = useDispatch();


  // GET /v1/categorias
  useEffect(() => {
    const obtenerCategorias = async () => {
      dispatch(mostrarSpinner());
      try {
        // Esta ruta devuelve el array directo: [ {_id, name, createdAt}, ... ]
        const respuesta = await axiosConfig.get("/v1/categorias");
        dispatch(guardarCategorias(respuesta.data));
      } catch (error) {
        console.error("Error al cargar las categorías: ", error);
        toast.error("No se pudieron cargar las categorías.");
      } finally {
        dispatch(ocultarSpinner());
      }
    }
    obtenerCategorias();
  }, [dispatch, recargarCategorias]);


  // GET /v1/actividades (o /v1/actividades/categoria/:categoryId si hay filtro)
  useEffect(() => {
    const obtenerActividades = async () => {
      dispatch(mostrarSpinner());
      try {
        const url = filtroCategoria
          ? `/v1/actividades/categoria/${filtroCategoria}?page=${pagina}&limit=5`
          : `/v1/actividades?page=${pagina}&limit=5`;
        const respuesta = await axiosConfig.get(url);
        const lista = respuesta.data.data ?? [];
        dispatch(guardarActividades(lista));
        setTotalPaginas(respuesta.data.totalPages ?? 1);
        setTotalActividades(respuesta.data.total ?? lista.length);
      } catch (error) {
        console.error("Error al cargar las actividades: ", error);
        toast.error("No se pudieron cargar las actividades.");
      } finally {
        dispatch(ocultarSpinner());
      }
    }
    obtenerActividades();
  }, [dispatch, pagina, filtroCategoria, recargarActividades]);


  // Gráfica: la tabla trae solo 5 por página, así que pedimos todas para contarlas.
  // Se vuelve a calcular cuando cambia la lista (crear, editar o eliminar).
  useEffect(() => {
    const contarActividades = async () => {
      try {
        const respuesta = await axiosConfig.get("/v1/actividades?page=1&limit=100");
        const todas = respuesta.data.data ?? [];

        // Igual que en Clima.jsx: cuenta cuántas veces aparece cada categoría
        const conteo = {};
        todas.forEach(actividad => {
          const c = actividad.categoryId;
          conteo[c] = (conteo[c] || 0) + 1;
        });
        setActividadesPorCategoria(conteo);
      } catch (error) {
        console.error("Error al contar las actividades: ", error);
      }
    }
    contarActividades();
  }, [actividades]);


  const abrirModal = (tipo, elemento) => {
    setSeleccion(elemento);
    setErrorApi("");
    setModalAbierto(tipo);
  }

  const cerrarModal = () => {
    setSeleccion(null);
    setErrorApi("");
    setModalAbierto(null);
  }

  // Nombre de la categoría de una actividad
  const nombreCategoria = (categoryId) => {
    const categoria = categorias.find((c) => c._id === categoryId);
    return categoria ? categoria.name : "-";
  }


  // Gráfica circular (igual que optionsDona / dataDona en Clima.jsx)
  const optionsDona = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Actividades por categoría'
      }
    }
  };

  const dataDona = {
    labels: categorias.map(categoria => categoria.name),
    datasets: [
      {
        label: 'Actividades',
        data: categorias.map(categoria => actividadesPorCategoria[categoria._id] || 0),
        backgroundColor: coloresGrafica,
      }]
  };


  // POST /v1/actividades (crear) · PUT /v1/actividades/:id (editar)
  const guardarActividad = async (datos) => {
    dispatch(mostrarSpinner());
    setErrorApi("");
    try {
      if (datos._id) {
        const { _id, ...cambios } = datos;
        await axiosConfig.put(`/v1/actividades/${_id}`, cambios);
        dispatch(editarActividad(datos));
        toast.success("Actividad actualizada");
      } else {
        await axiosConfig.post("/v1/actividades", datos);
        setRecargarActividades(recargarActividades + 1);
        toast.success("Actividad creada");
      }
      cerrarModal();
    } catch (error) {
      console.error("Error al guardar la actividad: ", error);
      // El error se muestra dentro del modal, que queda abierto
      setErrorApi(error.response?.data?.message || "No se pudo guardar la actividad. Intentá nuevamente.");
    } finally {
      dispatch(ocultarSpinner());
    }
  }

  // POST /v1/categorias (crear) · PUT /v1/categorias/:id (editar)
  const guardarCategoria = async (datos) => {
    dispatch(mostrarSpinner());
    setErrorApi("");
    try {
      if (datos._id) {
        await axiosConfig.put(`/v1/categorias/${datos._id}`, { name: datos.name });
        dispatch(editarCategoria(datos));
        toast.success("Categoría actualizada");
      } else {
        await axiosConfig.post("/v1/categorias", datos);
        setRecargarCategorias(recargarCategorias + 1);
        toast.success("Categoría creada");
      }
      cerrarModal();
    } catch (error) {
      console.error("Error al guardar la categoría: ", error);
      setErrorApi(error.response?.data?.message || "No se pudo guardar la categoría. Intentá nuevamente.");
    } finally {
      dispatch(ocultarSpinner());
    }
  }

  // DELETE /v1/actividades/:id · DELETE /v1/categorias/:id
  const confirmarEliminar = async () => {
    dispatch(mostrarSpinner());
    try {
      if (modalAbierto === "eliminarActividad") {
        await axiosConfig.delete(`/v1/actividades/${seleccion._id}`);
        dispatch(eliminarActividad(seleccion._id));
        setTotalActividades(totalActividades - 1);
      } else {
        await axiosConfig.delete(`/v1/categorias/${seleccion._id}`);
        dispatch(eliminarCategoria(seleccion._id));
      }
      toast.success(`Se eliminó ${seleccion.name}`);
    } catch (error) {
      console.error("Error al eliminar: ", error);
      // Ej: actividad con inscripciones o categoría con actividades
      toast.error(error.response?.data?.message || "No se pudo eliminar. Intentá nuevamente.");
    } finally {
      cerrarModal();
      dispatch(ocultarSpinner());
    }
  }


  return (
    <>
      <Spinner />
      <main className="py-5">
        <div className="container">
          <div className="mb-4">
            <h1 className="h2 fw-bold mb-1">Panel de administración</h1>
            <p className="text-muted mb-0">Gestioná las actividades y categorías del centro.</p>
          </div>

          {/* Resumen + gráfica */}
          <div className="row g-3 mb-4">
            <div className="col-6 col-md-3">
              <div className="card stat-card p-3 h-100">
                <div className="small text-muted">Actividades</div>
                <div className="stat-value">{totalActividades}</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card stat-card p-3 h-100">
                <div className="small text-muted">Categorías</div>
                <div className="stat-value">{categorias.length}</div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="card p-3 h-100">
                <div style={{ height: "220px" }}>
                  <Doughnut options={optionsDona} data={dataDona} />
                </div>
              </div>
            </div>
          </div>

          {/* Pestañas (con useState en vez del JS de Bootstrap) */}
          <ul className="nav nav-underline admin-tabs mb-4">
            <li className="nav-item">
              <button
                type="button"
                className={`nav-link ${pestania === "actividades" ? "active" : ""}`}
                onClick={() => setPestania("actividades")}
              >
                <i className="bi bi-grid"></i> Actividades
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className={`nav-link ${pestania === "categorias" ? "active" : ""}`}
                onClick={() => setPestania("categorias")}
              >
                <i className="bi bi-tags"></i> Categorías
              </button>
            </li>
          </ul>

          {pestania === "actividades" ? (
            /* ===== TAB ACTIVIDADES ===== */
            <div>
              <div className="d-flex flex-wrap justify-content-between gap-2 mb-3">
                <select
                  className="form-select form-select-sm"
                  style={{ maxWidth: "220px" }}
                  value={filtroCategoria}
                  onChange={(e) => {
                    setFiltroCategoria(e.target.value);
                    setPagina(1);
                  }}
                >
                  <option value="">Todas las categorías</option>
                  {categorias.map((categoria) => (
                    <option key={categoria._id} value={categoria._id}>{categoria.name}</option>
                  ))}
                </select>
                <button type="button" className="btn btn-brand btn-sm" onClick={() => abrirModal("actividad", null)}>
                  <i className="bi bi-plus-lg"></i> Nueva actividad
                </button>
              </div>

              <div className="card">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="ps-4">Nombre</th>
                        <th>Categoría</th>
                        <th>Fecha</th>
                        <th>Horario</th>
                        <th className="text-end pe-4">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {actividades.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center text-muted py-4">No hay actividades para mostrar.</td>
                        </tr>
                      ) : (
                        actividades.map((actividad) => (
                          <tr key={actividad._id}>
                            <td className="ps-4"><strong>{actividad.name}</strong></td>
                            <td><span className="badge text-bg-light">{nombreCategoria(actividad.categoryId)}</span></td>
                            <td>{formatearFecha(actividad.date)}</td>
                            <td>{actividad.schedule}</td>
                            <td className="text-end pe-4">
                              <div className="d-inline-flex gap-2">
                                <button type="button" className="btn btn-outline-secondary btn-sm" aria-label="Editar" onClick={() => abrirModal("actividad", actividad)}>
                                  <i className="bi bi-pencil"></i>
                                </button>
                                <button type="button" className="btn btn-outline-danger btn-sm" aria-label="Eliminar" onClick={() => abrirModal("eliminarActividad", actividad)}>
                                  <i className="bi bi-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <nav className="mt-4">
                <ul className="pagination pagination-sm justify-content-center">
                  <li className={`page-item ${pagina === 1 ? "disabled" : ""}`}>
                    <button type="button" className="page-link" onClick={() => setPagina(pagina - 1)}>Anterior</button>
                  </li>
                  <li className="page-item active">
                    <span className="page-link">{pagina}</span>
                  </li>
                  <li className={`page-item ${pagina >= totalPaginas ? "disabled" : ""}`}>
                    <button type="button" className="page-link" onClick={() => setPagina(pagina + 1)}>Siguiente</button>
                  </li>
                </ul>
              </nav>
            </div>
          ) : (
            /* ===== TAB CATEGORÍAS ===== */
            <div>
              <div className="d-flex justify-content-end mb-3">
                <button type="button" className="btn btn-brand btn-sm" onClick={() => abrirModal("categoria", null)}>
                  <i className="bi bi-plus-lg"></i> Nueva categoría
                </button>
              </div>

              <div className="card">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="ps-4">Nombre</th>
                        <th>Creada</th>
                        <th className="text-end pe-4">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categorias.length === 0 ? (
                        <tr>
                          <td colSpan="3" className="text-center text-muted py-4">No hay categorías para mostrar.</td>
                        </tr>
                      ) : (
                        categorias.map((categoria) => (
                          <tr key={categoria._id}>
                            <td className="ps-4"><strong>{categoria.name}</strong></td>
                            <td className="text-muted small">{formatearFecha(categoria.createdAt)}</td>
                            <td className="text-end pe-4">
                              <div className="d-inline-flex gap-2">
                                <button type="button" className="btn btn-outline-secondary btn-sm" aria-label="Editar" onClick={() => abrirModal("categoria", categoria)}>
                                  <i className="bi bi-pencil"></i>
                                </button>
                                <button type="button" className="btn btn-outline-danger btn-sm" aria-label="Eliminar" onClick={() => abrirModal("eliminarCategoria", categoria)}>
                                  <i className="bi bi-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <ActividadModal
        isOpen={modalAbierto === "actividad"}
        onRequestClose={cerrarModal}
        actividad={seleccion}
        categorias={categorias}
        onSave={guardarActividad}
        errorApi={errorApi}
      />
      <CategoriaModal
        isOpen={modalAbierto === "categoria"}
        onRequestClose={cerrarModal}
        categoria={seleccion}
        onSave={guardarCategoria}
        errorApi={errorApi}
      />
      <EliminarModal
        isOpen={modalAbierto === "eliminarActividad" || modalAbierto === "eliminarCategoria"}
        onRequestClose={cerrarModal}
        nombre={seleccion?.name}
        onConfirm={confirmarEliminar}
      />
    </>
  )
}

export default Admin;
