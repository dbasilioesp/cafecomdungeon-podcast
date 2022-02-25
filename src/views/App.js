/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from "react-router-dom";
import './App.css';
import mixpanel from '../plugins/mixpanel';
import LogoImg from '../assets/logo.png';

mixpanel.track('Page Loaded');

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <a href="/" class="app__header__link">
          <img src={LogoImg} alt="Logo Café com Dungeon fundo amarelo, xícara de café no meio" width="75px" height="75px"/>
          <h1>Café com Dungeon</h1>
        </a>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
