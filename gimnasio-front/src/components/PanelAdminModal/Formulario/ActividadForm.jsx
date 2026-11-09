import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { actividadAdminSchema, hoyTexto } from './validations/admin.schema';

// "2026-11-25T00:00:00.000Z" -> "2026-11-25" (formato que usa <input type="date">)
const aFechaInput = (fecha) => (fecha ? fecha.slice(0, 10) : "");


// Si recibe "actividad" es para editar; si es null, es para crear
const ActividadForm = ({ actividad, categorias, onSave, onCancel, errorApi }) => {

    const editando = actividad !== null;

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isDirty }
    } = useForm({
        resolver: yupResolver(actividadAdminSchema),
        // Al crear, la fecha es la de hoy (el campo no se muestra)
        defaultValues: { name: "", categoryId: "", date: hoyTexto(), schedule: "", description: "" },
        mode: "onChange"
    });

    // Al editar, se cargan los datos de la actividad en el formulario
    useEffect(() => {
        if (actividad) {
            reset({
                name: actividad.name || "",
                categoryId: actividad.categoryId || "",
                date: aFechaInput(actividad.date),
                schedule: actividad.schedule || "",
                description: actividad.description || "",
            })
        }
    }, [actividad, reset]);


    const onSubmit = async (values) => {
        if (editando) {
            await onSave({ _id: actividad._id, ...values });
        } else {
            // Al crear no se manda la descripción: la genera la IA.
            // La fecha es la del momento en que se crea la actividad.
            await onSave({
                name: values.name,
                categoryId: values.categoryId,
                date: hoyTexto(),
                schedule: values.schedule,
            });
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-header">
                <h5 className="modal-title fw-bold">{editando ? "Editar actividad" : "Nueva actividad"}</h5>
                <button type="button" className="btn-close" aria-label="Cerrar" onClick={onCancel} disabled={isSubmitting}></button>
            </div>

            <div className="modal-body">
                <div className="mb-3">
                    <label htmlFor="actName" className="form-label">Nombre</label>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field }) => (
                            <input
                                {...field}
                                id="actName"
                                type="text"
                                placeholder="Ej: Spinning Intenso"
                                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                            />
                        )}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="actCategory" className="form-label">Categoría</label>
                    <Controller
                        control={control}
                        name="categoryId"
                        render={({ field }) => (
                            <select
                                {...field}
                                id="actCategory"
                                className={`form-select ${errors.categoryId ? "is-invalid" : ""}`}
                            >
                                <option value="">Seleccioná una categoría</option>
                                {categorias.map((categoria) => (
                                    <option key={categoria._id} value={categoria._id}>
                                        {categoria.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                    {errors.categoryId && <div className="invalid-feedback">{errors.categoryId.message}</div>}
                </div>

                <div className="row g-3 mb-3">
                    {/* La fecha solo se pide al editar; al crear se usa la de hoy */}
                    {editando && (
                        <div className="col-6">
                            <label htmlFor="actDate" className="form-label">Fecha</label>
                            <Controller
                                control={control}
                                name="date"
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        id="actDate"
                                        type="date"
                                        className={`form-control ${errors.date ? "is-invalid" : ""}`}
                                    />
                                )}
                            />
                            {errors.date && <div className="invalid-feedback">{errors.date.message}</div>}
                        </div>
                    )}
                    <div className={editando ? "col-6" : "col-12"}>
                        <label htmlFor="actSchedule" className="form-label">Horario</label>
                        <Controller
                            control={control}
                            name="schedule"
                            render={({ field }) => (
                                <input
                                    {...field}
                                    id="actSchedule"
                                    type="time"
                                    className={`form-control ${errors.schedule ? "is-invalid" : ""}`}
                                />
                            )}
                        />
                        {errors.schedule && <div className="invalid-feedback">{errors.schedule.message}</div>}
                    </div>
                </div>

                {editando ? (
                    <div className="mb-1">
                        <label htmlFor="actDescription" className="form-label">Descripción</label>
                        <Controller
                            control={control}
                            name="description"
                            render={({ field }) => (
                                <textarea
                                    {...field}
                                    id="actDescription"
                                    rows="3"
                                    className={`form-control ${errors.description ? "is-invalid" : ""}`}
                                />
                            )}
                        />
                        {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                    </div>
                ) : (
                    <div className="form-text">
                        <i className="bi bi-stars text-brand"></i> Al crear la actividad, la descripción se genera automáticamente con IA.
                    </div>
                )}

                {/* Error de la API, ej: 409 "Ya existe una actividad con ese nombre." */}
                {errorApi && (
                    <div className="alert alert-danger small mt-3 mb-0">
                        <i className="bi bi-exclamation-circle"></i> {errorApi}
                    </div>
                )}
            </div>

            <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" onClick={onCancel} disabled={isSubmitting}>
                    Cancelar
                </button>
                <button type="submit" className="btn btn-brand" disabled={isSubmitting || !isDirty}>
                    {isSubmitting ? "Guardando..." : "Guardar"}
                </button>
            </div>
        </form>
    )
}

export default ActividadForm
