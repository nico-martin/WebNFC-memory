import React from 'react';
import { shuffleArray } from '@common/utils/misc';

type Player = 1 | 2;

export interface CardI {
  index: number;
  imageUrl: string;
  foundBy: Player;
  isVisible: boolean;
}

const IMAGES = ['cat', 'dog', 'mouse', 'bird', 'duck'];
const CARD_IMAGES = [...IMAGES, ...IMAGES];

const useMemoryGame = (): {
  cards: Array<CardI>;
  activePlayer: Player;
  player: Array<Player>;
  viewCard: (index: number) => void;
} => {
  const [cards, setCards] = React.useState<Array<CardI>>([]);
  const [activePlayer, setActivePlayer] = React.useState<Player>(1);
  const [cardToCompare, setCardToCompare] = React.useState<CardI>(null);

  const player: Array<Player> = [1, 2];

  React.useEffect(() => {
    resetCards();
  }, []);

  const resetCards = (): void =>
    setCards(
      shuffleArray(CARD_IMAGES).map((imageUrl, index) => ({
        index,
        imageUrl,
        foundBy: null,
        isVisible: false,
      }))
    );

  const viewCard = (index: number): void => {
    if (cardToCompare && index === cardToCompare.index) {
      return;
    }

    setCards((cards) =>
      cards.map((card, i) =>
        i === index ? { ...card, isVisible: true } : card
      )
    );

    if (!cardToCompare) {
      setCardToCompare(cards[index]);
    } else {
      window.setTimeout(() => {
        if (cardToCompare.imageUrl === cards[index].imageUrl) {
          setCards((cards) =>
            cards.map((card, i) =>
              i === index || i === cardToCompare.index
                ? { ...card, foundBy: activePlayer }
                : card
            )
          );
        } else {
          setCards((cards) =>
            cards.map((card, i) => ({ ...card, isVisible: false }))
          );
        }
        setCardToCompare(null);
        setActivePlayer((activePlayer) => (activePlayer === 1 ? 2 : 1));
      }, 1000);
    }
  };

  return { cards, activePlayer, player, viewCard };
};

export default useMemoryGame;
