import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { editActividadSchema } from './validations/actividad.schema';

// "2026-11-25T00:00:00.000Z" -> "2026-11-25" (formato que usa <input type="date">)
const aFechaInput = (fecha) => (fecha ? fecha.slice(0, 10) : "");


const EditarActividadForm = ({ actividad, onSave, onCancel }) => {

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isDirty }
    } = useForm({
        resolver: yupResolver(editActividadSchema),
        defaultValues: { name: "", description: "", date: "", schedule: "" },
        mode: "onChange"
    });

    // Cuando llega la actividad, se cargan sus datos en el formulario
    useEffect(() => {
        if (actividad) {
            reset({
                name: actividad.name || "",
                description: actividad.description || "",
                date: aFechaInput(actividad.date),
                schedule: actividad.schedule || "",
            })
        }
    }, [actividad, reset]);


    const onSubmit = async (values) => {
        await onSave({ _id: actividad._id, categoryId: actividad.categoryId, ...values })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-header">
                <h5 className="modal-title fw-bold">Editar actividad</h5>
                <button type="button" className="btn-close" aria-label="Cerrar" onClick={onCancel} disabled={isSubmitting}></button>
            </div>

            <div className="modal-body">
                <div className="mb-3">
                    <label htmlFor="editName" className="form-label">Nombre</label>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field }) => (
                            <input
                                {...field}
                                id="editName"
                                type="text"
                                placeholder="Nombre de la actividad"
                                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                            />
                        )}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="editDescription" className="form-label">Descripción</label>
                    <Controller
                        control={control}
                        name="description"
                        render={({ field }) => (
                            <textarea
                                {...field}
                                id="editDescription"
                                rows="3"
                                className={`form-control ${errors.description ? "is-invalid" : ""}`}
                            />
                        )}
                    />
                    {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                </div>

                <div className="row g-3">
                    <div className="col-6">
                        <label htmlFor="editDate" className="form-label">Fecha</label>
                        <Controller
                            control={control}
                            name="date"
                            render={({ field }) => (
                                <input
                                    {...field}
                                    id="editDate"
                                    type="date"
                                    className={`form-control ${errors.date ? "is-invalid" : ""}`}
                                />
                            )}
                        />
                        {errors.date && <div className="invalid-feedback">{errors.date.message}</div>}
                    </div>
                    <div className="col-6">
                        <label htmlFor="editSchedule" className="form-label">Horario</label>
                        <Controller
                            control={control}
                            name="schedule"
                            render={({ field }) => (
                                <input
                                    {...field}
                                    id="editSchedule"
                                    type="time"
                                    className={`form-control ${errors.schedule ? "is-invalid" : ""}`}
                                />
                            )}
                        />
                        {errors.schedule && <div className="invalid-feedback">{errors.schedule.message}</div>}
                    </div>
                </div>
            </div>

            <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" onClick={onCancel} disabled={isSubmitting}>
                    Cancelar
                </button>
                <button type="submit" className="btn btn-brand" disabled={isSubmitting || !isDirty}>
                    {isSubmitting ? "Guardando..." : "Guardar cambios"}
                </button>
            </div>
        </form>
    )
}

export default EditarActividadForm
