import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { axiosConfig } from '../../../utils/axiosConfig';
import toast from 'react-hot-toast';
import Spinner from '../../ListaActividadesModal/Spinner/Spinner';
import EditarInscripcionModal from '../Modal/EditarInscripcionModal';
import CancelarInscripcionModal from '../Modal/CancelarInscripcionModal';
import { useDispatch, useSelector } from 'react-redux';
import { mostrarSpinner, ocultarSpinner } from '../../../store/slices/spinnerSlice';
import { guardarInscripciones, editarInscripcion, eliminarInscripcion } from '../../../store/slices/inscripcionesSlice';
import { guardarPremium } from '../../../store/slices/premiumSlice';
import { guardarCategorias } from '../../../store/slices/categoriasSlice';

// Plan Basico máximo 4 inscripciones
const MAXIMO_BASICO = 4;

// La API manda la fecha en UTC ("2026-11-25T00:00:00.000Z") timeZone UTC evita que se muestre un día antes.
const formatearFecha = (fecha) =>
    fecha
        ? new Date(fecha).toLocaleDateString("es-UY", { timeZone: "UTC" })
        : "-";

const Inscripcion = () => {
    const inscripciones = useSelector(state => state.inscripciones.listaInscripciones);
    const premium = useSelector(state => state.premium.esPremium);
    const categorias = useSelector(state => state.categorias.listaCategorias);
    const [actividades, setActividades] = useState({});

    //GET /v1/inscripciones?page=1&limit=5
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    // Filtro por categoría (igual que en el panel de admin): "" = todas
    const [filtroCategoria, setFiltroCategoria] = useState("");
    // Total de inscripciones SIN filtro, para la barra del plan
    const [totalInscripciones, setTotalInscripciones] = useState(0);
    const [modalAbierto, setModalAbierto] = useState(null);
    const [inscripcionSeleccionada, setInscripcionSeleccionada] = useState(null);

    const dispatch = useDispatch();

    // GET /v1/categorias (devuelve el array directo) para el select del filtro
    useEffect(() => {
        const obtenerCategorias = async () => {
            try {
                const respuesta = await axiosConfig.get("/v1/categorias");
                dispatch(guardarCategorias(respuesta.data));
            } catch (error) {
                console.error("Error al cargar las categorías: ", error);
            }
        }
        obtenerCategorias();
    }, [dispatch]);

    useEffect(() => {
        const obtenerInscripciones = async () => {
            dispatch(mostrarSpinner());
            try {
                // La API devuelve solo las inscripciones del usuario logeado.
                // Si hay una categoría elegida, se agrega &categoryId=...
                const url = filtroCategoria
                    ? `/v1/inscripciones?page=${pagina}&limit=5&categoryId=${filtroCategoria}`
                    : `/v1/inscripciones?page=${pagina}&limit=5`;
                const respuesta = await axiosConfig.get(url);
                const lista = respuesta.data.data ?? [];
                dispatch(guardarInscripciones(lista));
                setTotalPaginas(respuesta.data.totalPages ?? 1);
                // El total para el plan solo se toma cuando no hay filtro
                if (!filtroCategoria) {
                    setTotalInscripciones(respuesta.data.total ?? lista.length);
                }

                const datosActividades = {};
                for (const inscripcion of lista) {
                    const idActividad = inscripcion.activityId;
                    if (idActividad && !datosActividades[idActividad]) {
                        try {
                            const respuestaActividad = await axiosConfig.get(`/v1/actividades/${idActividad}`);
                            const actividad = respuestaActividad.data.data ?? respuestaActividad.data;
                            datosActividades[idActividad] = actividad;
                        } catch (error) {
                            // Si falla, esa fila muestra -
                            console.error("Error al cargar la actividad: ", error);
                        }
                    }
                }
                setActividades(datosActividades);
            } catch (error) {
                console.error("Error al cargar las inscripciones: ", error);
                toast.error("No se pudieron cargar tus inscripciones. Intentá nuevamente más tarde.");
            } finally {
                dispatch(ocultarSpinner());
            }
            try {
                const respuestaUsuario = await axiosConfig.get("/v1/usuarios/me");
                dispatch(guardarPremium(respuestaUsuario.data.premium || false));
            } catch (error) {
                console.error("Error al obtener el plan del usuario: ", error);
            }
        }
        obtenerInscripciones();
    }, [dispatch, pagina, filtroCategoria]);


    const abrirModal = (inscripcion, tipo) => {
        setInscripcionSeleccionada(inscripcion);
        setModalAbierto(tipo);
    }

    const cerrarModal = () => {
        setInscripcionSeleccionada(null);
        setModalAbierto(null);
    }

    // Editar inscripcion (PATCH)
    const guardarCambios = async (inscripcionEditada) => {
        dispatch(mostrarSpinner());
        try {
            // PATCH /v1/inscripciones/:id "date": "2026-11-01"
            await axiosConfig.patch(`/v1/inscripciones/${inscripcionEditada._id}`, {
                date: inscripcionEditada.date,
            });
            dispatch(editarInscripcion(inscripcionEditada));
            toast.success("Inscripción actualizada");
            cerrarModal();
        } catch (error) {
            console.error("Error al actualizar la inscripción: ", error);
            toast.error(error.response?.data?.error || "No se pudo actualizar la inscripción. Intentá nuevamente.");
        } finally {
            dispatch(ocultarSpinner());
        }
    }

    // DELETE /v1/inscripciones/:id
    const cancelarInscripcion = async (inscripcion) => {
        dispatch(mostrarSpinner());
        try {
            await axiosConfig.delete(`/v1/inscripciones/${inscripcion._id}`);
            dispatch(eliminarInscripcion(inscripcion._id));
            setTotalInscripciones(totalInscripciones - 1);
            toast.success(`Cancelaste tu inscripción a ${inscripcion.activityName}`);
            cerrarModal();
        } catch (error) {
            console.error("Error al cancelar la inscripción: ", error);
            toast.error(error.response?.data?.error || "No se pudo cancelar la inscripción. Intentá nuevamente.");
        } finally {
            dispatch(ocultarSpinner());
        }
    }

    // Todas las inscripciones del usuario (no solo las de la página o el filtro)
    const cantidad = totalInscripciones;
    const porcentaje = Math.min((cantidad / MAXIMO_BASICO) * 100, 100);


    return (
        <>
            <Spinner />
            <main className="py-5">
                <div className="container">
                    <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
                        <div>
                            <h1 className="h2 fw-bold mb-1">Mis inscripciones</h1>
                            <p className="text-muted mb-0">
                                Las actividades a las que estás anotado.
                            </p>
                        </div>
                        <Link to="/actividades" className="btn btn-brand">
                            <i className="bi bi-plus-lg"></i> Nueva inscripción
                        </Link>
                    </div>

                    {/* Uso del plan (basico: máximo 4) */}
                    {!premium && (
                        <div className="card p-4 mb-4">
                            <div className="row align-items-center g-3">
                                <div className="col-md-8">
                                    <div className="d-flex justify-content-between small mb-2">
                                        <span className="fw-semibold">Plan Clásico</span>
                                        <span className="text-muted">{cantidad} de {MAXIMO_BASICO} inscripciones</span>
                                    </div>
                                    <div className="progress" style={{ height: "10px" }}>
                                        <div
                                            className="progress-bar"
                                            style={{ width: `${porcentaje}%`, background: "var(--brand)" }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Filtro por categoría*/}
                    <div className="d-flex mb-3">
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
                    </div>

                    {/* Tabla de inscripciones */}
                    <div className="card">
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th className="ps-4">Actividad</th>
                                        <th>Fecha</th>
                                        <th>Horario</th>
                                        <th>Inscripto el</th>
                                        <th className="text-end pe-4">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inscripciones.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center text-muted py-4">
                                                {filtroCategoria
                                                    ? "No tenés inscripciones en esta categoría."
                                                    : "Todavía no tenés inscripciones."}
                                            </td>
                                        </tr>
                                    ) : (
                                        inscripciones.map((inscripcion) => {
                                            const actividad = actividades[inscripcion.activityId];
                                            return (
                                                <tr key={inscripcion._id}>
                                                    <td className="ps-4">
                                                        <strong>{actividad?.name || "-"}</strong>
                                                    </td>
                                                    <td>{formatearFecha(inscripcion.date)}</td>
                                                    <td>{actividad?.schedule || "-"}</td>
                                                    <td className="text-muted small">{formatearFecha(inscripcion.createdAt)}</td>
                                                    <td className="text-end pe-4">
                                                        <div className="d-inline-flex gap-2">
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary btn-sm"
                                                                onClick={() => abrirModal({ ...inscripcion, activityName: actividad?.name }, "editar")}
                                                            >
                                                                <i className="bi bi-pencil"></i> Editar
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-danger btn-sm"
                                                                onClick={() => abrirModal({ ...inscripcion, activityName: actividad?.name }, "cancelar")}
                                                            >
                                                                <i className="bi bi-x-lg"></i> Cancelar
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Paginación (page / totalPages de la respuesta) */}
                    <nav className="mt-4">
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${pagina === 1 ? "disabled" : ""}`}>
                                <button type="button" className="page-link" onClick={() => setPagina(pagina - 1)}>
                                    Anterior
                                </button>
                            </li>
                            <li className="page-item active">
                                <span className="page-link">{pagina}</span>
                            </li>
                            <li className={`page-item ${pagina >= totalPaginas ? "disabled" : ""}`}>
                                <button type="button" className="page-link" onClick={() => setPagina(pagina + 1)}>
                                    Siguiente
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </main>

            <EditarInscripcionModal
                isOpen={modalAbierto === "editar"}
                onRequestClose={cerrarModal}
                inscripcion={inscripcionSeleccionada}
                onSave={guardarCambios}
            />
            <CancelarInscripcionModal
                isOpen={modalAbierto === "cancelar"}
                onRequestClose={cerrarModal}
                inscripcion={inscripcionSeleccionada}
                onConfirm={cancelarInscripcion}
            />
        </>
    );
};

export default Inscripcion;
