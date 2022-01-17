import React from 'react';
import styled from 'styled-components';

import Status from './Status';

const Container = styled.div`
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  &:hover {
    background-color: var(--secondary-color);
  }
  div:first-child {
    margin-right: 0.5rem;
  }
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  h3 {
    margin: 0.3rem;
    width: 100%;
  }
`;
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--text-color);
`;
const Comments = styled.div`
  background-color: var(--border-color);
  border-radius: var(--border-radius);
  padding: 0.4rem;
`;

function Issue({ issue, repo, owner }) {
  return (
    <Container>
      <Title>
        <Status state={issue.state} />
        <h3>
          <a href={`/issue/${owner}/${repo}/${issue.number}`}>{issue.title}</a>
        </h3>
      </Title>
      <Content>
        <div>
          Posted on {new Date(issue.created_at).toLocaleDateString()} by{' '}
          {issue.user.login}
        </div>
        <Comments>💬{issue.comments}</Comments>
      </Content>
    </Container>
  );
}

export default Issue;
