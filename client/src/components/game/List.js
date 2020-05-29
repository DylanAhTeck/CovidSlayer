import React, { useContext } from 'react';
import { FixedSizeList } from 'react-window';
import GameContext from '../../context/game/gameContext';

const List = ({ comm }) => {
  const gameContext = useContext(GameContext);
  //const { commentary, game, loadGame } = gameContext;
  const { commentary } = gameContext;

  // useEffect(() => {
  //   loadGame();
  // }, [loadGame]);

  // console.log(commentary);

  const Row = ({ index, style }) => (
    <div style={style}>{commentary[index]}</div>
  );

  return (
    <FixedSizeList
      height={250}
      width={1000}
      itemSize={25}
      itemCount={commentary.length}
    >
      {Row}
    </FixedSizeList>
  );
};

export default List;
