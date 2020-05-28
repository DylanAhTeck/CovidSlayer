import React from 'react';
import { FixedSizeList } from 'react-window';

const items = [
  'Player 1 attack Covid, rexeives 23 damage',
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10
]; // some list of items

const List = nope => {
  const Row = ({ index }) => <div style={{}}>{items[index]}</div>;

  return (
    <FixedSizeList
      height={250}
      width={1000}
      itemSize={35}
      itemCount={items.length}
    >
      {Row}
    </FixedSizeList>
  );
};

export default List;
