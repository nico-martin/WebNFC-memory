import React from 'react';
import cn from '@common/utils/classnames';
import {
  CARD_IMAGES,
  CARD_COUNT,
  KEYS_MODE_CARDS,
  setKeysModeCards,
} from '@common/utils/constants';
import { shuffleArray } from '@common/utils/misc';
import Card from './Card';
import styles from './Setup.css';

let imageUrls = shuffleArray(CARD_IMAGES);

const Setup = ({
  className,
  setDone,
}: {
  className?: string;
  setDone: () => void;
}) => {
  const [indexToSetup, setIndexToSetup] = React.useState<number>(0);
  const keyPress = (e: KeyboardEvent) => {
    const key = parseInt(e.key);
    if (
      isNaN(key) ||
      KEYS_MODE_CARDS.filter(({ keyCode }) => keyCode === key).length !== 0
    ) {
      console.log('invalid key');
      return;
    }
    setKeysModeCards([
      ...KEYS_MODE_CARDS,
      {
        index: indexToSetup,
        keyCode: key,
        imageUrl: imageUrls[indexToSetup],
        foundBy: null,
      },
    ]);
    if (KEYS_MODE_CARDS.length === imageUrls.length) {
      setDone();
    } else {
      setIndexToSetup(indexToSetup + 1);
    }
  };

  const reset = () => {
    imageUrls = shuffleArray(CARD_IMAGES);
    setIndexToSetup(0);
    setKeysModeCards([]);
  };

  React.useEffect(() => {
    reset();
  }, []);

  React.useEffect(() => {
    window.addEventListener('keypress', keyPress);
    return () => window.removeEventListener('keypress', keyPress);
  }, [indexToSetup]);

  return (
    <div className={cn(className, styles.root)}>
      <div className={cn(styles.description)}>
        <p>This is a description</p>
      </div>
      <div className={cn(className, styles.cardOverview)}>
        {Array.from(Array(CARD_COUNT).keys()).map((e, index) => (
          <Card
            key={index}
            icon={`mdi/${indexToSetup > index ? 'check' : 'nfc-tag'}`}
            state={
              indexToSetup === index
                ? 'pending'
                : indexToSetup > index
                ? 'complete'
                : 'idle'
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Setup;
