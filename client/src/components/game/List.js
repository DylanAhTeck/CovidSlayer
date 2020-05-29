import React, { useContext, useState, useEffect } from 'react';
import { FixedSizeList } from 'react-window';
import PropTypes from 'prop-types';
import GameContext from '../../context/game/gameContext';

const List = ({ comm }) => {
  const gameContext = useContext(GameContext);
  const { commentary, game, loadGame } = gameContext;

  console.log(commentary);
  console.log(comm);
  // useEffect(() => {
  //   loadGame();
  // }, [loadGame]);

  // console.log(commentary);

  const Row = ({ index }) => <div style={{}}>{commentary[index]}</div>;

  return (
    <FixedSizeList
      height={250}
      width={1000}
      itemSize={50}
      itemCount={commentary.length}
    >
      {Row}
    </FixedSizeList>
  );
};

export default List;
