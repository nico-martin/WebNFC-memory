import React from 'react';
import { PortalBox } from '@theme';
import { sortObject } from '@common/utils/misc';
import Card from './Card';
import styles from './Game.css';
import Player from './Player';
import useMemoryGame from './useMemoryGame';

const Game = () => {
  const { player, cards, activePlayer, viewCard, loadingWidth, resetCards } =
    useMemoryGame();

  const leaderBoard = React.useMemo<{ [key: number]: number }>(
    () =>
      player.reduce(
        (acc, player) => ({
          ...acc,
          [player]: cards.filter((card) => card.foundBy === player).length / 2,
        }),
        {}
      ),
    [cards]
  );

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        {player.map((p) => (
          <Player
            number={p}
            pointCount={leaderBoard[p]}
            className={styles.player}
            key={p}
            isActive={activePlayer === p}
          />
        ))}
      </header>
      <div className={styles.cardsOverview}>
        {cards.map((card, index) => (
          <Card
            card={card}
            className={styles.card}
            viewCard={viewCard}
            key={index}
            loadingWidth={loadingWidth}
          />
        ))}
      </div>
      {cards.filter((card) => card.foundBy === null).length === 0 && (
        <PortalBox close={() => resetCards()} title="Game Ended">
          <div className={styles.info}>
            {leaderBoard[1] === leaderBoard[2] ? (
              <p>It is a draw.</p>
            ) : (
              <p>Player {leaderBoard[1] < leaderBoard[2] ? 2 : 1} won.</p>
            )}{' '}
            <p>Close to start a new game.</p>
          </div>
        </PortalBox>
      )}
    </div>
  );
};

export default Game;
