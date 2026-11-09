import * as yup from "yup";

// Fecha de hoy en el mismo formato que <input type="date">: "2026-11-09"
export const hoyTexto = () => {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");
    return `${anio}-${mes}-${dia}`;
}

// Crear  -> POST /v1/actividades { name, categoryId, date, schedule }  (date = hoy, no se pide)
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
