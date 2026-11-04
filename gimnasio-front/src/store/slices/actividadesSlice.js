import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listaActividades: []
}

export const actividadesSlice = createSlice({
    name: "actividades",
    initialState,
    reducers: {
        // Reemplaza la lista completa (lo que devuelve GET /v1/actividades)
        guardarActividades: (state, action) => {
            state.listaActividades = action.payload;
        },
        // Agrega una actividad nueva al final
        agregarActividad: (state, action) => {
            state.listaActividades.push(action.payload);
        },
        // Reemplaza los datos de una actividad ya existente (después del PUT)
        editarActividad: (state, action) => {
            const actividadEditada = action.payload;
            // Las actividades de la API usan "_id", no "id"
            const index = state.listaActividades.findIndex(actividad => actividad._id === actividadEditada._id);
            if (index !== -1) {
                // Mezclamos para no perder campos que el formulario no manda (createdAt, etc.)
                state.listaActividades[index] = { ...state.listaActividades[index], ...actividadEditada };
            }
        }
    }
});

export const { guardarActividades, agregarActividad, editarActividad } = actividadesSlice.actions;
export default actividadesSlice.reducer;
