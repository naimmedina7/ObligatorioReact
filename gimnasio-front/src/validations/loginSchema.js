import * as yup from "yup";

const loginSchema = yup.object({
    username: yup
        .string()
        .trim()
        .required("El usuario es obligatorio")
        .min(3, "Mínimo 3 caracteres")
        .max(20, "Máximo 20 caracteres"),
    password: yup
        .string()
        .required("La contraseña es obligatoria")
        .min(3, "Mínimo 3 caracteres")
        .max(20, "Máximo 20 caracteres"),
})

export default loginSchema
