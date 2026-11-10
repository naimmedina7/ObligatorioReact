// Lee el payload del JWT guardado
// sirve para mostrar o ocultar cosas segun el rol
export const obtenerUsuario = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
        return JSON.parse(decodeURIComponent(escape(atob(payload))));
    } catch {
        return null;
    }
}
