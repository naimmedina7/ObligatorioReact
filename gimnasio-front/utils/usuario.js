// Lee el payload del JWT guardado: { id, username, role, iat, exp }.
// Solo sirve para mostrar/ocultar cosas en pantalla: la API es la que valida el token.
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
