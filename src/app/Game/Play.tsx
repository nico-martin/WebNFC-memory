import React from 'react';
import { PortalBox } from '@theme';
import cn from '@common/utils/classnames';
import { KEYS_MODE_CARDS } from '@common/utils/constants';
import { CardI } from '@common/utils/types';
import Player from '../Player';
import Card from './Card';
import styles from './Play.css';

const Play = ({
  className = '',
  restartGame,
}: {
  className?: string;
  restartGame: () => void;
}) => {
  const [selected, setSelected] = React.useState<[CardI, CardI]>([null, null]);
  const [activePlayer, setActivePlayer] = React.useState<1 | 2>(1);
  const [player, setPlayer] = React.useState<{
    1: Array<string>;
    2: Array<string>;
  }>({
    1: [],
    2: [],
  });

  React.useEffect(() => {
    const rootStyles = window.getComputedStyle(document.body);
    document.documentElement.style.setProperty(
      '--c-bkg',
      activePlayer === 1
        ? rootStyles.getPropertyValue('--c-bkg-p1')
        : rootStyles.getPropertyValue('--c-bkg-p2')
    );
    return () =>
      document.documentElement.style.setProperty(
        '--c-bkg',
        rootStyles.getPropertyValue('--c-bkg-default')
      );
  }, [activePlayer]);

  React.useEffect(() => {
    if (selected[0] && selected[1]) {
      selected[0].imageUrl === selected[1].imageUrl &&
        setPlayer((user) => ({
          ...user,
          [activePlayer]: [...user[activePlayer], selected[0].imageUrl],
        }));

      window.setTimeout(() => {
        setActivePlayer((user) => (user === 1 ? 2 : 1));
        setSelected([null, null]);
      }, 1500);
    }
  }, [selected]);

  const keyPress = (e: KeyboardEvent) => {
    const key = parseInt(e.key);
    const activeCard: CardI = KEYS_MODE_CARDS.find(
      (card) => card.keyCode === key
    );

    if (selected[0] && selected[1]) {
      console.log('already two images set');
      return;
    }

    // check if key has Card
    if (!activeCard) {
      console.log('Invalid key');
      return;
    }

    // check if is visible
    if (selected[0] && selected[0].keyCode === activeCard.keyCode) {
      console.log('Already visible');
      return;
    }

    // check if Card is already found
    if ([...player[1], ...player[2]].indexOf(activeCard.imageUrl) !== -1) {
      console.log('Already found');
      return;
    }

    // set Background image for current card
    setSelected(selected[0] ? [selected[0], activeCard] : [activeCard, null]);
  };

  React.useEffect(() => {
    window.addEventListener('keypress', keyPress);
    return () => window.removeEventListener('keypress', keyPress);
  }, [player, selected]);

  return (
    <div className={cn(className, styles.root)}>
      <header className={styles.header}>
        {Object.entries(player).map(([p, images]) => (
          <Player
            number={parseInt(p)}
            pointCount={images.length}
            className={styles.player}
            key={p}
            isActive={activePlayer === parseInt(p)}
          />
        ))}
      </header>
      <div className={styles.cardOverview}>
        {selected.map((card, i) => (
          <Card
            icon={card?.imageUrl ? '' : 'mdi/nfc-tag'}
            state={
              (i === 0 && !card) || (i === 1 && Boolean(selected[0]))
                ? 'pending'
                : 'idle'
            }
            style={{
              backgroundImage: card?.imageUrl ? `url("${card.imageUrl}")` : '',
            }}
          />
        ))}
      </div>
      {[...player[1], ...player[2]].length === KEYS_MODE_CARDS.length / 2 && (
        <PortalBox close={() => restartGame()} title="Game Ended">
          <div className={styles.info}>
            {player[1].length === player[2].length ? (
              <p>It is a draw.</p>
            ) : (
              <p>Player {player[1].length < player[2].length ? 2 : 1} won.</p>
            )}{' '}
            <p>Close to start a new game.</p>
          </div>
        </PortalBox>
      )}
    </div>
  );
};

export default Play;
