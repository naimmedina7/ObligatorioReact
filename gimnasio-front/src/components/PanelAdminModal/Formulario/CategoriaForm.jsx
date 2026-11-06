import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { categoriaSchema } from './validations/admin.schema';


// Si recibe "categoria" es para editar; si es null, es para crear
const CategoriaForm = ({ categoria, onSave, onCancel, errorApi }) => {

    const editando = categoria !== null;

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isDirty }
    } = useForm({
        resolver: yupResolver(categoriaSchema),
        defaultValues: { name: "" },
        mode: "onChange"
    });

    // Al editar, se carga el nombre de la categoría
    useEffect(() => {
        if (categoria) {
            reset({ name: categoria.name || "" })
        }
    }, [categoria, reset]);


    const onSubmit = async (values) => {
        if (editando) {
            await onSave({ _id: categoria._id, name: values.name });
        } else {
            await onSave({ name: values.name });
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-header">
                <h5 className="modal-title fw-bold">{editando ? "Editar categoría" : "Nueva categoría"}</h5>
                <button type="button" className="btn-close" aria-label="Cerrar" onClick={onCancel} disabled={isSubmitting}></button>
            </div>

            <div className="modal-body">
                <label htmlFor="catName" className="form-label">Nombre</label>
                <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                        <input
                            {...field}
                            id="catName"
                            type="text"
                            placeholder="Ej: Pilates"
                            className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        />
                    )}
                />
                {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}

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

export default CategoriaForm
