import React from 'react';
import Card from './Card';
import styles from './Game.css';
import Player from './Player';
import useMemoryGame from './useMemoryGame';

const Game = () => {
  const { player, cards, activePlayer, viewCard } = useMemoryGame();
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        {player.map((p) => (
          <Player
            number={p}
            pointCount={cards.filter((card) => card.foundBy === p).length / 2}
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
          />
        ))}
      </div>
    </div>
  );
};

export default Game;
