import { configureStore } from "@reduxjs/toolkit";
import spinnerReducer from "./slices/spinnerSlice";

import actividadesReducer from "./slices/actividadesSlice";

export const store = configureStore({
  reducer: {
    spinner: spinnerReducer,
    actividades: actividadesReducer,
  },
});
