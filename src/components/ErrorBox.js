import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  color: #e91e63;
  background-color: pink;
  padding: 0.5rem;
  border: 1px solid #e91e63;
  margin: 1rem 0;
  border-radius: var(--border-radius);
`;

function ErrorBox({ children }) {
  return <Container>{children}</Container>;
}

export default ErrorBox;
