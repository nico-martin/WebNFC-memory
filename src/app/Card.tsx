import React from 'react';
import { Icon } from '@theme';
import cn from '@common/utils/classnames';
import styles from './Card.css';
import { CardI } from './useMemoryGame';

const Card = ({
  card,
  className = '',
  viewCard,
  loadingWidth,
}: {
  card: CardI;
  className?: string;
  viewCard: (index: number) => void;
  loadingWidth: number;
}) => {
  return (
    <button
      onClick={() => (loadingWidth === 100 ? viewCard(card.index) : null)}
      disabled={card.foundBy !== null}
      className={cn(className, styles.root)}
      style={{
        backgroundImage:
          card.isVisible || card.foundBy !== null
            ? `url("${card.imageUrl}")`
            : '',
      }}
    >
      {card.foundBy !== null ? (
        <span className={styles.finderIcon}>{card.foundBy}</span>
      ) : (
        !card.isVisible && (
          <Icon icon="mdi/nfc-tag" className={styles.tagIcon} />
        )
      )}
      {card.isVisible && loadingWidth !== 100 && !Boolean(card.foundBy) && (
        <span
          className={styles.loadingIndicator}
          style={{ width: loadingWidth + '%' }}
        />
      )}
    </button>
  );
};

export default Card;
