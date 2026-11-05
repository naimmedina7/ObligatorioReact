import "./App.css";
//import './bootstrap.min.css';

import { Provider } from "react-redux";
import { store } from "./store/store";

import Menu from "./components/Menu";
import MenuUsuario from "./components/MenuUsuario";
import Login from "./components/Login";
import Home from "./components/Home";
import Registro from "./components/Registro";
import Footer from "./components/Footer";
import ListaActividades from "./components/ListaActividadesModal/Lista/ListaActividades";
import Inscripcion from "./components/htmlAcomponent/Inscripcion";
import Premium from "./components/htmlAcomponent/Premium";
import Admin from "./components/htmlAcomponent/Admin";
import { Routes, Route, BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<Menu />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="*" element={<Home />} />
          </Route>
          {/* Rutas para usuarios logueados */}
          <Route element={<MenuUsuario />}>
            <Route path="/actividades" element={<ListaActividades />} />
            <Route path="/inscripciones" element={<Inscripcion />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
      <Toaster position="botton-right" />
    </Provider>
  );
};

export default App;
