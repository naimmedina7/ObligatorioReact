import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    esPremium: false
}

export const premiumSlice = createSlice({
    name: "premium",
    initialState,
    reducers: {
        // Guarda el plan que devuelve GET /v1/usuarios/me
        guardarPremium: (state, action) => {
            state.esPremium = action.payload;
        },
        // Después del PATCH /v1/usuarios/premium
        activarPremium: state => {
            state.esPremium = true;
        }
    }
});

export const { guardarPremium, activarPremium } = premiumSlice.actions;
export default premiumSlice.reducer;
