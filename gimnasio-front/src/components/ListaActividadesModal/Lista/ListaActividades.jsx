import { useEffect, useState } from 'react';
import { axiosConfig } from '../../../../utils/axiosConfig';
import { obtenerUsuario } from '../../../../utils/usuario';
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

    // Qué modal está abierto: null | "inscripcion" | "editar"
    const [modalAbierto, setModalAbierto] = useState(null);
    const [actividadSeleccionada, setActividadSeleccionada] = useState(null);

    const dispatch = useDispatch();

    // El botón "Editar" solo se muestra a los administradores
    const esAdmin = obtenerUsuario()?.role === "admin";


    useEffect(() => {
        const obtenerActividades = async () => {
            dispatch(mostrarSpinner());
            try {
                const respuesta = await axiosConfig.get("/v1/actividades")
                const lista = respuesta.data.data ?? [];
                dispatch(guardarActividades(lista))

                // Pedimos el nombre de cada categoría.
                // Si dos actividades comparten categoría, se pide una sola vez.
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

    // POST /v1/inscripciones { activityId, date, activityName }
    const inscribirse = async (inscripcion) => {
        dispatch(mostrarSpinner());
        try {
            await axiosConfig.post("/v1/inscripciones", inscripcion);
            toast.success(`Te inscribiste a ${inscripcion.activityName}`);
            cerrarModal();
        } catch (error) {
            console.error("Error al inscribirse: ", error);
            // Si la API explica el motivo (ej: límite del plan), lo mostramos
            toast.error(error.response?.data?.message || "No se pudo completar la inscripción. Intentá nuevamente.");
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
            toast.error(error.response?.data?.message || "No se pudo actualizar la actividad. Intentá nuevamente.");
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




// import { useEffect, useState } from 'react';
// import { axiosConfig } from '../../../utils/axiosConfig';
// import toast from 'react-hot-toast';
// import EditTaskModal from '../Modal/EditTaskModal';
// import Spinner from '../Spinner/Spinner';
// import { useDispatch } from 'react-redux';
// import { mostrarSpinner, ocultarSpinner } from '../../../store/slices/spinnerSlice';
// import "./ListaDeTareas.css";


// const ListaDeTareasModal = () => {

//     const [tareas, setTareas] = useState([]);
//     const [modalAbierto, setModalAbierto] = useState(false);
//     const [tareaSeleccionada, setTareaSeleccionada] = useState(null);

//     const dispatch = useDispatch();

//     useEffect(() => {
//         const obtenerTareas = async () => {
//             dispatch(mostrarSpinner());
//             try {
//                 const respuesta = await axiosConfig.get("/todos", {
//                     params: { _limit: 20 }
//                 })
//                 console.log(respuesta);
//                 setTareas(respuesta.data)
//                 toast.success("Tareas cargadas exitosamente");
//             } catch (error) {
//                 console.error("Error al cargar las tareas: ", error);
//                 toast.error("No se pudieron cargar las tareas");
//             } finally {
//                 dispatch(ocultarSpinner());
//             }
//         }
//         obtenerTareas();
//     }, []);


//     const abrirModal = (tarea) => {
//         setTareaSeleccionada(tarea);
//         setModalAbierto(true);
//     };

//     const cerrarModal = () => {
//         setTareaSeleccionada(null);
//         setModalAbierto(false);
//     }

//     const guardarCambios = async (tareaEditada) => {
//         dispatch(mostrarSpinner());
//         try {
//             await axiosConfig.put(`/todos/${tareaEditada.id}`, tareaEditada);
//             setTareas((prev) =>
//                 prev.map((t) => (t.id === tareaEditada.id ? { ...t, ...tareaEditada } : t))
//             );
//             toast.success("Tarea actualizada");
//             cerrarModal();
//         } catch (error) {
//             console.error("Error al actualizar la tarea:", error);
//             toast.error("No se pudo actualizar la tarea");
//         } finally {
//             dispatch(ocultarSpinner())
//         }
//     }


//     return (
//         <div style={{ padding: "16px" }}>
//             <Spinner />
//             <h2 className="tareas-title">Últimas 20 tareas</h2>

//             <ul className="tareas-list">
//                 {tareas.map((tarea) => (
//                     <li key={tarea.id} className="tarea-item">
//                         <div className="tarea-info">
//                             <span className="tarea-id">#{tarea.id}</span>
//                             <span className="tarea-title">{tarea.title}</span>
//                             <span className={`tarea-badge ${tarea.completed ? "ok" : "pending"}`}>
//                                 {tarea.completed ? "Completada" : "Pendiente"}
//                             </span>
//                         </div>

//                         <div className="tarea-actions">
//                             <button className="btn btn-edit" onClick={() => abrirModal(tarea)}>
//                                 Editar
//                             </button>
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//             <EditTaskModal
//                 isOpen={modalAbierto}
//                 onRequestClose={cerrarModal}
//                 task={tareaSeleccionada}
//                 onSave={guardarCambios}
//             />
//         </div>
//     )
// }

// export default ListaDeTareasModal