import React from 'react';
import styles from './Game.css';
import Play from './Game/Play';
import Setup from './Game/Setup';

const Game = () => {
  const [isSetUp, setIsSetUp] = React.useState<boolean>(false);

  return (
    <div className={styles.root}>
      {isSetUp ? (
        <Play className={styles.play} restartGame={() => setIsSetUp(false)} />
      ) : (
        <Setup className={styles.setup} setDone={() => setIsSetUp(true)} />
      )}
    </div>
  );
};

export default Game;
