import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { shuffleArray } from '@common/utils/misc';

type Player = 1 | 2;

export interface CardI {
  index: number;
  imageUrl: string;
  foundBy: Player;
  isVisible: boolean;
}

const IMAGES = [
  'https://images.unsplash.com/photo-1511044568932-338cba0ad803?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1465153690352-10c1b29577f8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
];
const CARD_IMAGES = [...IMAGES, ...IMAGES];

const useMemoryGame = (): {
  cards: Array<CardI>;
  activePlayer: Player;
  player: Array<Player>;
  viewCard: (index: number) => void;
  loadingWidth: number;
  uuid: string;
  resetCards: () => void;
} => {
  const [cards, setCards] = React.useState<Array<CardI>>([]);
  const [activePlayer, setActivePlayer] = React.useState<Player>(1);
  const [cardToCompare, setCardToCompare] = React.useState<CardI>(null);
  const [loadingWidth, setLoadingWidth] = React.useState<number>(0);
  const [uuid, setUuid] = React.useState<string>(null);

  const player: Array<Player> = [1, 2];

  React.useEffect(() => {
    IMAGES.map((url) => {
      const img = new Image();
      img.src = url;
    });
    resetCards();
  }, []);

  const resetCards = (): void => {
    setUuid(uuidv4());
    setCards(
      shuffleArray(CARD_IMAGES).map((imageUrl, index) => ({
        index,
        imageUrl,
        foundBy: null,
        isVisible: false,
      }))
    );
  };

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
      const loadingInterval = window.setInterval(() => {
        const step = 10 / 1500;
        setLoadingWidth((width) => width + step);
      }, 10);

      window.setTimeout(() => {
        clearInterval(loadingInterval);
        setLoadingWidth(0);
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
      }, 1500);
    }
  };

  return {
    cards,
    activePlayer,
    player,
    viewCard,
    loadingWidth: 100 - Math.round(loadingWidth * 100),
    uuid,
    resetCards,
  };
};

export default useMemoryGame;
