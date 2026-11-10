import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listaInscripciones: []
}

export const inscripcionesSlice = createSlice({
    name: "inscripciones",
    initialState,
    reducers: {
        // Reemplaza la lista completa ( GET /v1/inscripciones)
        guardarInscripciones: (state, action) => {
            state.listaInscripciones = action.payload;
        },
        // Agrega una inscripción nueva al final
        agregarInscripcion: (state, action) => {
            state.listaInscripciones.push(action.payload);
        },
        // Actualiza una inscripción existente (después del PUT)
        editarInscripcion: (state, action) => {
            const inscripcionEditada = action.payload;
            const index = state.listaInscripciones.findIndex(inscripcion => inscripcion._id === inscripcionEditada._id);
            if (index !== -1) {
                // Mezclamos para no perder campos que no se editaron (activityName, createdAt, etc.)
                state.listaInscripciones[index] = { ...state.listaInscripciones[index], ...inscripcionEditada };
            }
        },
        // Saca una inscripción de la lista (después del DELETE) Recibe el _id
        eliminarInscripcion: (state, action) => {
            state.listaInscripciones = state.listaInscripciones.filter(inscripcion => inscripcion._id !== action.payload);
        }
    }
});

export const { guardarInscripciones, agregarInscripcion, editarInscripcion, eliminarInscripcion } = inscripcionesSlice.actions;
export default inscripcionesSlice.reducer;
