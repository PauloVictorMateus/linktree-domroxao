import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import logo from './assets/logo.jpg';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import Menu from './page/menu/menu';
import { PiBowlFoodBold } from 'react-icons/pi';

function Home() {
  return (
    <div className="linktree-container">
      <div className="header">
        <img src={logo} alt="Logo da Empresa" className="logo" />
        <h1>Dom Roxão</h1>
        <h3>Açaiteria e Doceria</h3>
        <p>Conheça nossas redes sociais</p>
        <div className="links">
          <a href="https://www.instagram.com/domroxaoacai/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="icon" /> Instagram
          </a>
          <a href="https://api.whatsapp.com/send?phone=5585992680560" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="icon" /> WhatsApp
          </a>
          <a href="/menu"  rel="noopener noreferrer">
            <PiBowlFoodBold  className="icon" /> Faça seu pedido  
          </a>
        </div>
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
