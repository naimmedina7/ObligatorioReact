import "./App.css";
//import './bootstrap.min.css';

import { Provider } from "react-redux";
import { store } from "./store/store";

import Menu from "./components/Menu";
import Login from "./components/Login";
import Home from "./components/Home";
import Registro from "./components/Registro";
import Footer from "./components/Footer";
import { Routes, Route, BrowserRouter } from "react-router";

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
        </Routes>
      </BrowserRouter>
      <Footer />
    </Provider>
  );
};

export default App;
