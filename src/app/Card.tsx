import React from 'react';
import { Icon } from '@theme';
import cn from '@common/utils/classnames';
import styles from './Card.css';
import { CardI } from './useMemoryGame';

const Card = ({
  card,
  className = '',
  viewCard,
}: {
  card: CardI;
  className?: string;
  viewCard: (index: number) => void;
}) => {
  return (
    <button
      onClick={() => viewCard(card.index)}
      disabled={card.foundBy !== null}
      className={cn(className, styles.root)}
    >
      {card.foundBy !== null ? (
        'found by ' + card.foundBy
      ) : card.isVisible ? (
        card.imageUrl
      ) : (
        <Icon icon="mdi/nfc-tag" className={styles.tagIcon} />
      )}
    </button>
  );
};

export default Card;
