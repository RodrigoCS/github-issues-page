import React from 'react';
import styled from 'styled-components';

import { formatDate } from '../utils/dates';
import Markdown from './Markdown';
import Reactions from './Reactions';

const Container = styled.div`
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
  overflow: hidden;
  background-color: white;
`;
const Header = styled.h3`
  font-weight: 400;
  display: flex;
  align-items: center;
  margin-top: 0;
`;
const User = styled.span`
  font-weight: bold;
`;
const Footer = styled.div``;
const Avatar = styled.div`
  background-image: url(${(props) => props.src});
  background-size: cover;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  margin-right: 1rem;
`;

function CommentBox({ comment }) {
  if (!comment) return null;
  const { url, total_count, ...reactions } = comment.reactions;
  return (
    <Container>
      <a target='_blank' href={comment.html_url}>
        <Header>
          <Avatar src={comment.user.avatar_url} />
          <div>
            <User>{comment.user.login}</User> commented on{' '}
            <i>{formatDate(comment.created_at)}</i>
          </div>
        </Header>
      </a>
      <div>
        <Markdown>{comment.body}</Markdown>
      </div>
      <Footer>
        <Reactions reactions={reactions} />
      </Footer>
    </Container>
  );
}

export default CommentBox;
