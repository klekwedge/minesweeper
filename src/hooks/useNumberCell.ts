import { Numbers } from '../types/types';
// | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven' | 'eight'
function useNumberCell(num: number): Numbers {
  console.log('!', num);
  switch (num) {
    case 1:
      return 'one';
    case 2:
      return 'two';
    case 3:
      return 'three';
    case 4:
      return 'four';
    case 5:
      return 'five';
    case 6:
      return 'six';
    case 7:
      return 'seven';
    case 8:
      return 'eight';
    default:
      return 0;
  }
}

export default useNumberCell;
