import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listaCategorias: []
}

export const categoriasSlice = createSlice({
    name: "categorias",
    initialState,
    reducers: {
        // Reemplaza la lista completa (lo que devuelve GET /v1/categorias)
        guardarCategorias: (state, action) => {
            state.listaCategorias = action.payload;
        },
        // Agrega una categoría nueva al final
        agregarCategoria: (state, action) => {
            state.listaCategorias.push(action.payload);
        },
        // Actualiza una categoría existente (después del PUT)
        editarCategoria: (state, action) => {
            const categoriaEditada = action.payload;
            const index = state.listaCategorias.findIndex(categoria => categoria._id === categoriaEditada._id);
            if (index !== -1) {
                state.listaCategorias[index] = { ...state.listaCategorias[index], ...categoriaEditada };
            }
        },
        // Saca una categoría de la lista (después del DELETE). Recibe el _id
        eliminarCategoria: (state, action) => {
            state.listaCategorias = state.listaCategorias.filter(categoria => categoria._id !== action.payload);
        }
    }
});

export const { guardarCategorias, agregarCategoria, editarCategoria, eliminarCategoria } = categoriasSlice.actions;
export default categoriasSlice.reducer;
