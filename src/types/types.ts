export enum MaskCell {
  hidden,
  show,
  showOne,
  showTwo,
  showThree,
  showFour,
  showFive,
  showSix,
  showSeven,
  showEight,
  flag,
  question,
  bomb,
  explosion,
}

export type Numbers = 0 | 'one' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven' | 'eight'


export const MaskCellType = {
  [MaskCell.hidden]: '0px -50px',
  [MaskCell.show]: '-17px -50px',
  [MaskCell.showOne]: '0px -67px',
  [MaskCell.showTwo]: '-16px -67px',
  [MaskCell.showThree]: '-35px -67px',
  [MaskCell.showFour]: '-52px -67px',
  [MaskCell.showFive]: '-69px -67px',
  [MaskCell.showSix]: '-85px -67px',
  [MaskCell.showSeven]: '-103px -67px',
  [MaskCell.showEight]: '-119px -67px',
  [MaskCell.flag]: '-34px -50px',
  [MaskCell.question]: '-51px -50px',
  [MaskCell.bomb]: '-85px -50px',
  [MaskCell.explosion]: '-102px -50px',
};
