export enum MaskCell {
  hidden,
  show,
  flag,
  question,
  bomb,
  explosion,
}

export type Numbers = 0 | 'one' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven' | 'eight';

export const MaskCellType = {
  [MaskCell.hidden]: '0px -50px',
  [MaskCell.show]: '-17px -50px',
  [MaskCell.flag]: '-34px -50px',
  [MaskCell.question]: '-51px -50px',
  [MaskCell.bomb]: '-85px -50px',
  [MaskCell.explosion]: '-102px -50px',
};

export const numbers = [
  '0px -67px',
  '-16px -67px',
  '-35px -67px',
  '-52px -67px',
  '-69px -67px',
  '-85px -67px',
  '-103px -67px',
  '-119px -67px',
];
