export enum MaskCell {
  hidden,
  show,
  flag,
  question,
  bomb,
  explosion,
}

export const MaskCellType = {
  [MaskCell.hidden]: '0px -50px',
  [MaskCell.show]: '-17px -50px',
  [MaskCell.flag]: '-34px -50px',
  [MaskCell.question]: '-51px -50px',
  [MaskCell.bomb]: '-85px -50px',
  [MaskCell.explosion]: '-102px -50px',
};
