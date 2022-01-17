import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 1rem;
  background-color: var(--secondary-color);
  margin-top: 1rem;
  border-radius: var(--border-radius);
  color: var(--text-color);
`;

function EmptyBox({ children }) {
  return <Container>{children}</Container>;
}

export default EmptyBox;
