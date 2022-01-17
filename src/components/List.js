import React from 'react';
import styled from 'styled-components';

import Button from './Button';

const Container = styled.div``;
const Item = styled.div``;
const Pagination = styled.div`
  display: flex;
`;
const PageNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;
const Loading = styled.div``;

function List({ items, itemRenderer, pagination, loading, empty }) {
  function defaultRenderer(item, index) {
    return <Item key={`${index}_${item}`}>{item}</Item>;
  }

  function handleDecrement(event) {
    pagination.setPage(pagination.currentPage - 1);
  }
  function handleIncrement(event) {
    pagination.setPage(pagination.currentPage + 1);
  }
  function handleFirstPage(event) {
    pagination.setPage(1);
  }

  if (loading) return <Loading>Loading...</Loading>;

  return (
    <Container>
      {items.length === 0 && empty}
      {items.map((item, index) =>
        itemRenderer ? itemRenderer(item) : defaultRenderer(item, index),
      )}
      {items.length > 0 && pagination && (
        <Pagination>
          <Button
            onClick={handleFirstPage}
            disabled={pagination.currentPage === 1}
          >
            ◀◀
          </Button>
          <Button
            onClick={handleDecrement}
            disabled={pagination.currentPage === 1}
          >
            ◀
          </Button>
          <PageNumber>{pagination.currentPage}</PageNumber>
          <Button onClick={handleIncrement} disabled={!pagination.hasNextPage}>
            ▶
          </Button>
        </Pagination>
      )}
    </Container>
  );
}

export default List;
