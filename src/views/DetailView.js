import { Octokit } from '@octokit/core';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';

import CommentBox from '../components/CommentBox';
import List from '../components/List';
import Status from '../components/Status';

const octokit = new Octokit({ auth: `` });

const Container = styled.div`
  padding: 1rem;
`;
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  a {
    font-style: italic;
  }
`;
const GoBack = styled(Button)`
  padding-right: 0.5rem;
`;
const CommentsContainer = styled.div`
  border-radius: var(--border-radius);
  padding: 1rem;
`;
const Title = styled.div``;

function DetailView(props) {
  const { owner, repo, issue_number } = useParams();
  const [issue, setIssue] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchIssue() {
      try {
        const route = `GET /repos/${owner}/${repo}/issues/${issue_number}`;
        const cacheKey = `CACHED_${route}`;
        const cachedData = JSON.parse(localStorage.getItem(cacheKey));

        if (cachedData) {
          setIssue(cachedData);
        } else {
          const { data } = await octokit.request(route, {
            owner,
            repo,
            issue_number,
          });
          localStorage.setItem(cacheKey, JSON.stringify(data));
          setIssue(data);
        }
      } catch (error) {
        setError(error);
      }
    }
    fetchIssue();
  }, []);

  useEffect(() => {
    async function fetchComments() {
      try {
        const route = `GET ${issue.comments_url.replace(
          'https://api.github.com',
          '',
        )}`;
        const cacheKey = `CACHED_${route}`;
        const cachedData = JSON.parse(localStorage.getItem(cacheKey));
        if (cachedData) {
          setComments(cachedData);
        } else {
          const { data } = await octokit.request(route);
          localStorage.setItem(cacheKey, JSON.stringify(data));
          setComments(data);
        }
      } catch (error) {
        setError(error);
      }
    }
    if (issue) fetchComments();
  }, [issue]);

  function commentRenderer(comment) {
    return <CommentBox key={comment.id} comment={comment} />;
  }

  function handleBack(event) {
    navigate(-1);
  }

  function renderEmpty() {
    return <div>No comments</div>;
  }

  return (
    <Container>
      <Nav>
        <GoBack onClick={handleBack}>⬅ Go Back to List</GoBack>
        <a target='_blank' href={issue?.html_url}>
          Open in GitHub
        </a>
      </Nav>
      <Title>
        <h2>
          <Status state={issue?.state}>{issue?.title}</Status>
        </h2>
      </Title>

      <CommentBox comment={issue} />
      <CommentsContainer>
        <h3>💬 Comments</h3>
        <List
          items={comments}
          itemRenderer={commentRenderer}
          empty={renderEmpty()}
        />
      </CommentsContainer>
    </Container>
  );
}

export default DetailView;
