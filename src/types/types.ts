export enum MaskCell {
  hidden,
  show,
  flag,
  question,
  bomb,
  explosion,
  markedBomb
}

export const MaskCellType = {
  [MaskCell.hidden]: '0px -50px',
  [MaskCell.show]: '-17px -50px',
  [MaskCell.flag]: '-34px -50px',
  [MaskCell.question]: '-51px -50px',
  [MaskCell.bomb]: '-85px -50px',
  [MaskCell.explosion]: '-102px -50px',
  [MaskCell.markedBomb]: '-118px -50px',
};

export const timer = [
  '-126px 0px',
  '-1px 0px',
  '-14px 0px',
  '-28px 0px',
  '-42px 0px',
  '-56px 0px',
  '-70px 0px',
  '-85px 0px',
  '-98px 0px',
  '-112px 0px',
];

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

export type FirstIndexType = {
  x: number;
  y: number;
};
