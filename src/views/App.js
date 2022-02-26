/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from "react-router-dom";
import mixpanel from '../plugins/mixpanel';
import LogoImg from '../assets/logo.png';
import styled from "styled-components";

mixpanel.track('Page Loaded');

const ContainerApp = styled.div`
  min-height: 100vh;
  font-size: calc(10px + 2vmin);
  padding: 30px 4vw;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  background-color: white;

  @media (max-width: 800px) {
    padding: 4vw 8vw;
  }
`

const Header = styled.header`
  margin-bottom: 40px;
`

const HeaderLink = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  color: black;
  text-decoration: none;
`

const HeaderTitle = styled.h1`
  line-height: 1;
  color: black;
  margin: 0;
  font-size: 3rem;

  @media (max-width: 800px) {
    font-size: 2.5rem;
  }
`

function App() {
  return (
    <ContainerApp>
      <div className="app">
        <Header>
          <HeaderLink href="/">
            <img src={LogoImg} alt="Logo Café com Dungeon fundo amarelo, xícara de café no meio" width="75px" height="75px"/>
            <HeaderTitle>Café com Dungeon</HeaderTitle>
          </HeaderLink>
        </Header>
        <main>
          <Outlet />
        </main>
      </div>
    </ContainerApp>
  );
}

export default App;
