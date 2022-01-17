import React from 'react';
import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  color: var(--secondary-color);
  border: 2px solid var(--primary-color);
  font-weight: bold;
  background-color: var(--primary-color);
  opacity: ${(props) => (props.disabled ? 0.2 : 1)};
  ${(props) =>
    !props.disabled &&
    css`
      &:hover {
        background-color: var(--secondary-color);
        color: var(--primary-color);
      }
    `}
`;

function Button(props) {
  function handleClick(e) {
    if (props.disabled) return;
    if (typeof props.onClick === 'function') props.onClick(e);
  }
  return (
    <StyledButton {...props} onClick={handleClick}>
      {props.children}
    </StyledButton>
  );
}

export default Button;
