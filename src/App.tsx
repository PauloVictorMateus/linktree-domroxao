import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import './App.css';
import logo from './assets/logo.jpg';

function App() {
  return (
    <div className="linktree-container">
      <div className="header">
        <img src={logo} alt="Logo da Empresa" className="logo" />
        <h1>Dom Roxão</h1>
        <h3>Açaiteria e Doceria</h3>
        <p>Conheça nossas redes sociais</p>
      </div>
      <div className="links">
        <a href="https://www.instagram.com/domroxaoacai/" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="icon" /> Instagram
        </a>
        <a href="whatsapp://send?phone=5585992680560&text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20da%20Dom%20Roxão" 
           target="_blank" 
           rel="noopener noreferrer">
          <FaWhatsapp className="icon" /> WhatsApp
        </a>
      </div>
    </div>
  );
}

export default App;
