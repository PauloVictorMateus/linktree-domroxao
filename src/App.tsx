import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import logo from "./assets/logo.jpg";
import Menu from "./page/menu/menu";

function Home() {
  return (
    <div className="linktree-container">
      <div className="header">
        <img src={logo} alt="Logo da Empresa" className="logo" />
        <h1>Dom Roxão</h1>
        <h3>Açaiteria e Doceria</h3>
        <p>Conheça nossas redes sociais</p>
        <div className="links"></div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </Router>
  );
}

export default App;
