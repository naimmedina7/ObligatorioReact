import * as yup from "yup";

// Fecha de hoy en el mismo formato que <input type="date">: "2026-11-05"
export const hoyTexto = () => {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");
    return `${anio}-${mes}-${dia}`;
}


export const editActividadSchema = yup.object().shape({
    name: yup.string().trim().min(3, "El nombre debe tener al menos 3 caracteres").required("El nombre es obligatorio"),
    description: yup.string().trim().required("La descripción es obligatoria"),
    date: yup.string().required("La fecha es obligatoria").test("no-pasada", "La fecha no puede ser anterior a hoy", (fecha) =>
                fecha ? fecha >= hoyTexto() : false
            ),
    schedule: yup.string().required("El horario es obligatorio"),
})

export const inscripcionSchema = yup.object().shape({
    date: yup.string().required("La fecha es obligatoria").test("no-pasada", "La fecha no puede ser anterior a hoy", (fecha) =>
                fecha ? fecha >= hoyTexto() : false
            ),
})
