import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { editInscripcionSchema, hoyTexto } from './validations/inscripcion.schema';

// "2026-11-25T00:00:00.000Z" -> "2026-11-25" (formato que usa <input type="date">)
const aFechaInput = (fecha) => (fecha ? fecha.slice(0, 10) : "");

const EditarInscripcionForm = ({ inscripcion, onSave, onCancel }) => {

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isDirty }
    } = useForm({
        resolver: yupResolver(editInscripcionSchema),
        defaultValues: { date: "" },
        mode: "onChange"
    });

    useEffect(() => {
        if (inscripcion) {
            reset({ date: aFechaInput(inscripcion.date) })
        }
    }, [inscripcion, reset]);


    const onSubmit = async (values) => {
        await onSave({ _id: inscripcion._id, date: values.date })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-header">
                <h5 className="modal-title fw-bold">Editar inscripción</h5>
                <button type="button" className="btn-close" aria-label="Cerrar" onClick={onCancel} disabled={isSubmitting}></button>
            </div>

            <div className="modal-body">
                <p className="mb-3">
                    Cambiá la fecha de tu inscripción a <strong>{inscripcion?.activityName}</strong>.
                </p>
                <div className="mb-3">
                    <label htmlFor="editFechaInscripcion" className="form-label">Fecha</label>
                    <Controller
                        control={control}
                        name="date"
                        render={({ field }) => (
                            <input
                                {...field}
                                id="editFechaInscripcion"
                                type="date"
                                min={hoyTexto()}
                                className={`form-control ${errors.date ? "is-invalid" : ""}`}
                            />
                        )}
                    />
                    {errors.date && <div className="invalid-feedback">{errors.date.message}</div>}
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

export default EditarInscripcionForm
