import * as yup from "yup";

// Crear  -> POST /v1/actividades { name, categoryId, date, schedule }
// Editar -> PUT  /v1/actividades/:id { name, categoryId, description, date, schedule }
export const actividadAdminSchema = yup.object().shape({
    name: yup.string().trim().min(3, "Mínimo 3 caracteres").max(50, "Máximo 50 caracteres").required("El nombre es obligatorio"),
    categoryId: yup.string().required("Seleccioná una categoría"),
    date: yup.string().required("La fecha es obligatoria"),
    schedule: yup.string().required("El horario es obligatorio"),
    description: yup.string().max(255, "Máximo 255 caracteres"),
})

// POST /v1/categorias · PUT /v1/categorias/:id { name }
export const categoriaSchema = yup.object().shape({
    name: yup.string().trim().min(3, "Mínimo 3 caracteres").max(50, "Máximo 50 caracteres").required("El nombre es obligatorio"),
})
