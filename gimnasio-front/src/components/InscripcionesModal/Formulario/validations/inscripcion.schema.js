import * as yup from "yup";

// Fecha de hoy en el mismo formato que <input type="date">: "2026-11-05"
export const hoyTexto = () => {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");
    return `${anio}-${mes}-${dia}`;
}

export const editInscripcionSchema = yup.object().shape({
    date: yup
        .string()
        .required("La fecha es obligatoria")
        // Como las dos fechas son texto "AAAA-MM-DD", se pueden comparar directo
        .test("no-pasada", "La fecha no puede ser anterior a hoy", (fecha) =>
            fecha ? fecha >= hoyTexto() : false
        ),
})
