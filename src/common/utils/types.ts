export type Player = 1 | 2;

export interface CardI {
  index: number;
  keyCode: number;
  imageUrl: string;
  foundBy: Player;
}
