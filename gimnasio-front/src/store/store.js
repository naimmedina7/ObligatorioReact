import { configureStore } from "@reduxjs/toolkit";
import spinnerReducer from "./slices/spinnerSlice";
import actividadesReducer from "./slices/actividadesSlice";
import inscripcionesReducer from "./slices/inscripcionesSlice";
import premiumReducer from "./slices/premiumSlice";
import categoriasReducer from "./slices/categoriasSlice";

export const store = configureStore({
  reducer: {
    spinner: spinnerReducer,
    actividades: actividadesReducer,
    inscripciones: inscripcionesReducer,
    premium: premiumReducer,
    categorias: categoriasReducer,
  },
});
