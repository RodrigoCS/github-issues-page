import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 0.5rem;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
  border-radius: var(--border-radius);
`;

function Input(props) {
  return <StyledInput {...props} />;
}

export default Input;
