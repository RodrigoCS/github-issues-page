import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;
const ReactionBadge = styled.div`
  background-color: var(--border-color);
  display: inline;
  padding: 2px 0.5rem;
  border-radius: var(--border-radius);
`;

function renderReactionIcon(reaction) {
  switch (reaction) {
    case '+1':
      return '👍';
    case '-1':
      return '👎';
    case 'confused':
      return '😕';
    case 'eyes':
      return '👀';
    case 'heart':
      return '❤️';
    case 'hooray':
      return '🙌';
    case 'laugh':
      return '🤣';
    case 'rocket':
      return '🚀';
    default:
      break;
  }
}

function Reactions({ reactions }) {
  function renderReactions() {
    return Object.keys(reactions).map((reaction) => {
      const count = reactions[reaction];
      if (!count) return null;
      return (
        <ReactionBadge>
          {renderReactionIcon(reaction)} {count}
        </ReactionBadge>
      );
    });
  }

  return <Container>{renderReactions()}</Container>;
}

export default Reactions;
