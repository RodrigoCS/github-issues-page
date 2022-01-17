import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Octokit } from '@octokit/core';
import { useSearchParams } from 'react-router-dom';

import Input from '../components/Input';
import List from '../components/List';
import Issue from '../components/Issue';
import Button from '../components/Button';
import ErrorBox from '../components/ErrorBox';
import EmptyBox from '../components/EmptyBox';

const octokit = new Octokit({ auth: `` });

const Container = styled.div`
  padding: 1rem;
`;
const ListContainer = styled.div`
  padding: 1rem 0;
`;
const InputContainer = styled.div`
  width: 100%;
  display: flex;
`;

function ListView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [URL, setURL] = useState(searchParams.get('repository') || '');
  const [repo, setRepo] = useState('');
  const [owner, setOwner] = useState('');
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState(URL);
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const [repo, owner] = URL.split('/').filter(Boolean).reverse();
    setLoading(true);
    setIssues([]);
    setError(null);
    setSearchParams({ repository: URL });
    setRepo(repo);
    setOwner(owner);
    async function fetchIssues() {
      try {
        const route = `GET /repos/${owner}/${repo}/issues`;
        const cacheKey = `CACHED_${route}_${page}`;
        const cachedData = JSON.parse(localStorage.getItem(cacheKey));
        if (cachedData) {
          setIssues(cachedData);
        } else {
          const { data } = await octokit.request(route, {
            page,
            state: 'all',
          });
          localStorage.setItem(cacheKey, JSON.stringify(data));
          setIssues(data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    if (URL) {
      fetchIssues();
    } else {
      setLoading(false);
      setIssues([]);
    }
  }, [URL, page]);

  function issueRenderer(issue) {
    return <Issue key={issue.id} repo={repo} owner={owner} issue={issue} />;
  }

  function handleURLChange(event) {
    const value = event.target.value;
    setInputValue(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setURL(inputValue);
  }

  return (
    <Container>
      <p>
        <i>Enter a GitHub repository url to view all its Issues.</i>
      </p>
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <Input
            style={{
              marginRight: '0.5rem',
              padding: '1rem',
              width: '100%',
            }}
            value={inputValue}
            type={'url'}
            onChange={handleURLChange}
            placeholder={'https://github.com/{owner}/{repo}'}
          />
          <Button
            style={{
              padding: '1rem',
            }}
            type='submit'
          >
            Submit
          </Button>
        </InputContainer>

        {error && (
          <ErrorBox>
            {error.message}: Please make sure the URL is correct, and that it is
            a public repository.
          </ErrorBox>
        )}
      </form>
      {URL && (
        <ListContainer>
          <List
            loading={loading}
            items={issues}
            itemRenderer={issueRenderer}
            pagination={{
              currentPage: page,
              hasNextPage: issues.length === 30,
              setPage,
            }}
            empty={<EmptyBox>No issues found.</EmptyBox>}
          />
        </ListContainer>
      )}
    </Container>
  );
}

export default ListView;
