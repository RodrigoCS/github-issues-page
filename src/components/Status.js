import React from 'react';
import styled from 'styled-components';
import { capitalize } from '../utils/strings';

const Container = styled.div`
  display: flex;
`;
const Badge = styled.span`
  background-color: #f3f3f3;
  border-radius: 0.5rem;
  padding: 2px 8px;
  margin-right: 0.5rem;
  width: 75px;
  text-align: center;
`;

function renderIcon(state) {
  if (state === 'open') return '🟢';
  if (state === 'closed') return '🟣';
}

function Status({ state, children }) {
  return (
    <Container>
      <Badge>
        {renderIcon(state)} {capitalize(state)}
      </Badge>
      {children}
    </Container>
  );
}

export default Status;
