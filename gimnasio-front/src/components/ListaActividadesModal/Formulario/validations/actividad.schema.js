import * as yup from "yup";

export const editActividadSchema = yup.object().shape({
    name: yup.string().trim().min(3, "El nombre debe tener al menos 3 caracteres").required("El nombre es obligatorio"),
    description: yup.string().trim().required("La descripción es obligatoria"),
    date: yup.string().required("La fecha es obligatoria"),
    schedule: yup.string().required("El horario es obligatorio"),
})

export const inscripcionSchema = yup.object().shape({
    date: yup.string().required("La fecha es obligatoria"),
})
