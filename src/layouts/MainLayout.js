import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Button from '../components/Button';

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 4rem;
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    margin-right: 1rem;
  }
`;
const Main = styled.main`
  max-width: 700px;
  width: 100%;
`;
const Footer = styled.footer`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 1rem;
  box-sizing: border-box;
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0) 100%
  );
`;

function MainLayout({ children }) {
  function handleClearCache() {
    localStorage.clear();
  }
  return (
    <Container>
      <Header>
        <h1>😺 GitHub Issues Page</h1>
      </Header>
      <Main>
        <Outlet />
      </Main>
      <Footer>
        <Button onClick={handleClearCache}>Clear Cache 🧹</Button>
      </Footer>
    </Container>
  );
}

export default MainLayout;
