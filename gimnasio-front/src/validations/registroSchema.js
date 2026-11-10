import * as yup from "yup";

// const TIPOS_IMAGEN = ["image/jpeg", "image/png"];

const registroSchema = yup.object({
    imagen: yup
        .mixed()
        .required("La foto de perfil es obligatoria"),
        // .test("tipo", "Solo se permiten imágenes JPG o PNG", (archivo) =>
        //     archivo ? TIPOS_IMAGEN.includes(archivo.type) : false
        // ),
    name: yup
        .string()
        .trim()
        .required("El nombre es obligatorio")
        .min(3, "Mínimo 3 caracteres")
        .max(20, "Máximo 20 caracteres"),
    username: yup
        .string()
        .trim()
        .required("El usuario es obligatorio")
        .min(3, "Mínimo 3 caracteres")
        .max(20, "Máximo 20 caracteres"),
    telefono: yup
        .string()
        .trim()
        .required("El teléfono es obligatorio")
        .max(20, "Máximo 20 caracteres"),
    password: yup
        .string()
        .required("La contraseña es obligatoria")
        .min(3, "Mínimo 3 caracteres")
        .max(20, "Máximo 20 caracteres"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Las contraseñas deben coincidir")
        .required("Confirmar la contraseña es obligatorio"),
})

export default registroSchema
