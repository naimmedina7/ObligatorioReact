import { useEffect, useState } from 'react';
import { axiosConfig } from '../../../utils/axiosConfig';
import { obtenerUsuario } from '../../../utils/usuario';
import toast from 'react-hot-toast';
import Actividad from '../../Actividad';
import Spinner from '../Spinner/Spinner';
import InscripcionModal from '../Modal/InscripcionModal';
import EditarActividadModal from '../Modal/EditarActividadModal';
import { useDispatch, useSelector } from 'react-redux';
import { mostrarSpinner, ocultarSpinner } from '../../../store/slices/spinnerSlice';
import { guardarActividades, editarActividad } from '../../../store/slices/actividadesSlice';


const ListaActividades = () => {

    // La lista vive en Redux (state.actividades.listaActividades)
    const actividades = useSelector(state => state.actividades.listaActividades);
    const [categorias, setCategorias] = useState({});

    // Que modal está abierto: null | "inscripcion" | "editar"
    const [modalAbierto, setModalAbierto] = useState(null);
    const [actividadSeleccionada, setActividadSeleccionada] = useState(null);

    const dispatch = useDispatch();

    // El botón "Editar" solo se muestra a los administradores
    const esAdmin = obtenerUsuario()?.role === "admin";


    useEffect(() => {
        const obtenerActividades = async () => {
            dispatch(mostrarSpinner());
            try {
                const respuesta = await axiosConfig.get("/v1/actividades?page=1&limit=10")
                const lista = respuesta.data.data ?? [];
                dispatch(guardarActividades(lista))
                const nombres = {};
                for (const actividad of lista) {
                    const id = actividad.categoryId;
                    if (id && !nombres[id]) {
                        try {
                            const respuestaCategoria = await axiosConfig.get(`/v1/categorias/${id}`);
                            const categoria = respuestaCategoria.data.data ?? respuestaCategoria.data;
                            nombres[id] = categoria.name;
                        } catch (error) {
                            // Si falla una categoría, esa tarjeta muestra "Sin categoría"
                            console.error("Error al cargar la categoría: ", error);
                        }
                    }
                }
                setCategorias(nombres)
                toast.success("Actividades cargadas exitosamente");
            } catch (error) {
                console.error("Error al cargar las actividades: ", error);
                toast.error("No se pudieron cargar las actividades. Por favor, intentá nuevamente más tarde.");
            } finally {
                dispatch(ocultarSpinner());
            }
        }
        obtenerActividades();
    }, [dispatch])

    const abrirModal = (actividad, tipo) => {
        setActividadSeleccionada(actividad);
        setModalAbierto(tipo);
    }

    const cerrarModal = () => {
        setActividadSeleccionada(null);
        setModalAbierto(null);
    }

    // POST /v1/inscripciones
    const inscribirse = async (inscripcion) => {
        dispatch(mostrarSpinner());
        try {
            await axiosConfig.post("/v1/inscripciones", inscripcion);
            toast.success(`Te inscribiste a ${inscripcion.activityName}`);
            cerrarModal();
        } catch (error) {
            console.error("Error al inscribirse: ", error);
            toast.error(error.response?.data?.error || "No se pudo completar la inscripción. Intentá nuevamente.");
        } finally {
            dispatch(ocultarSpinner());
        }
    }

    // PUT /v1/actividades/:id
    const guardarCambios = async (actividadEditada) => {
        dispatch(mostrarSpinner());
        try {
            const { _id, ...datos } = actividadEditada;
            await axiosConfig.put(`/v1/actividades/${_id}`, datos);
            dispatch(editarActividad(actividadEditada));
            toast.success("Actividad actualizada exitosamente");
            cerrarModal();
        } catch (error) {
            console.error("Error al actualizar la actividad: ", error);
            toast.error(error.response?.data?.error || "No se pudo actualizar la actividad. Intentá nuevamente.");
        } finally {
            dispatch(ocultarSpinner());
        }
    }

    return (
        <main className="py-5">
            <Spinner />
            <div className="container">
                <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
                    <div>
                        <h1 className="h2 fw-bold mb-1">Actividades</h1>
                        <p className="text-muted mb-0">Elegí una actividad e inscribite.</p>
                    </div>
                </div>

                {actividades.length === 0 ? (
                    <p className="text-muted text-center py-5">No hay actividades para mostrar.</p>
                ) : (
                    <div className="row g-4">
                        {actividades.map((actividad) => (
                            <Actividad
                                key={actividad._id}
                                actividad={actividad}
                                categoria={categorias[actividad.categoryId]}
                                puedeEditar={esAdmin}
                                onInscribir={(a) => abrirModal(a, "inscripcion")}
                                onEditar={(a) => abrirModal(a, "editar")}
                            />
                        ))}
                    </div>
                )}
            </div>

            <InscripcionModal
                isOpen={modalAbierto === "inscripcion"}
                onRequestClose={cerrarModal}
                actividad={actividadSeleccionada}
                onSave={inscribirse}
            />
            <EditarActividadModal
                isOpen={modalAbierto === "editar"}
                onRequestClose={cerrarModal}
                actividad={actividadSeleccionada}
                onSave={guardarCambios}
            />
        </main>
    )
}

export default ListaActividades;