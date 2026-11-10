import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { inscripcionSchema } from './validations/actividad.schema';

const aFechaInput = (fecha) => (fecha ? fecha.slice(0, 10) : "");


// POST /v1/inscripciones
const InscripcionForm = ({ actividad, onSave, onCancel }) => {

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isValid }
    } = useForm({
        resolver: yupResolver(inscripcionSchema),
        defaultValues: { date: "" },
        mode: "onChange"
    });

    // Por defecto se propone la fecha de la actividad
    useEffect(() => {
        if (actividad) {
            reset({ date: aFechaInput(actividad.date) })
        }
    }, [actividad, reset]);


    const onSubmit = async (values) => {
        await onSave({
            activityId: actividad._id,
            date: values.date,
            activityName: actividad.name,
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-header">
                <h5 className="modal-title fw-bold">Confirmar inscripción</h5>
                <button type="button" className="btn-close" aria-label="Cerrar" onClick={onCancel} disabled={isSubmitting}></button>
            </div>

            <div className="modal-body">
                <p className="mb-3">
                    Te vas a inscribir a <strong>{actividad?.name}</strong>.
                </p>
                <div className="mb-3">
                    <label htmlFor="fechaInscripcion" className="form-label">Fecha</label>
                    <Controller
                        control={control}
                        name="date"
                        render={({ field }) => (
                            <input
                                {...field}
                                id="fechaInscripcion"
                                type="date"
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
                <button type="submit" className="btn btn-brand" disabled={isSubmitting || !isValid}>
                    {isSubmitting ? "Inscribiendo..." : "Confirmar"}
                </button>
            </div>
        </form>
    )
}

export default InscripcionForm
