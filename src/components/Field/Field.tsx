import { useState } from 'react';
import { Flex, Box, Button } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import sprite from '/public/minesweeper-sprites.png';
import useCreateField from '../../hooks/useCreateField';

// type cellType = 'hide' | 'show' | 'flag';

enum MaskCell {
  hidden,
  show,
  flag,
  question,
}

const MaskCellType = {
  [MaskCell.hidden]: '0px -50px',
  [MaskCell.show]: '-16px -50px',
  [MaskCell.flag]: '-34px -50px',
  [MaskCell.question]: '-50px -50px',
};

function Field() {
  const fieldSize = 16;
  const dimension = new Array(fieldSize).fill(null);

  const [isLose, setIsLose] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [field, setField] = useState<number[]>(() => useCreateField(fieldSize));
  const [mask, setMask] = useState<MaskCell[]>(() => new Array(fieldSize * fieldSize).fill(MaskCell.hidden));

  const cellClickHandler = (counter: number) => {
    if (isLose || isWin) {
      return null;
    }

    return null;
  };

  console.log(field);
  console.log(mask);

  return (
    <Box border="5px solid #939393">
      {dimension.map((itemY, y) => (
        <Flex flexWrap="wrap" key={uuidv4()} style={{ display: 'flex' }}>
          {dimension.map((itemX, x) => (
            <Button
              cursor="pointer"
              key={uuidv4()}
              backgroundImage={sprite}
              backgroundRepeat="no-repeat"
              backgroundPosition={
                mask[y * fieldSize + x] !== MaskCell.show
                  ? MaskCellType[mask[y * fieldSize + x]]
                  : field[y * fieldSize + x]
              }
              outline="none"
              border="none"
              height="17px"
              width="17px"
            >
              {/* {mask[y * fieldSize + x] !== MaskCell.show
                ? mapMaskToView[mask[y * fieldSize + x]]
                : field[y * fieldSize + x]} */}
            </Button>
          ))}
        </Flex>
      ))}
    </Box>
  );
}

export default Field;
