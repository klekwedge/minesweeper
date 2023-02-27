import { useState } from 'react';
import { Flex, Box, Button } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import sprite from '/minesweeper-sprites.png';
import useCreateField from '../../hooks/useCreateField';

enum MaskCell {
  hidden,
  show,
  flag,
  question,
}

const MaskCellType = {
  [MaskCell.hidden]: '0px -50px',
  [MaskCell.show]: '-17px -50px',
  [MaskCell.flag]: '-34px -50px',
  [MaskCell.question]: '-51px -50px',
};

function Field() {
  const fieldSize = 16;
  const dimension = new Array(fieldSize).fill(null);

  const [isLose, setIsLose] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [field, setField] = useState<number[]>(() => useCreateField(fieldSize));
  const [mask, setMask] = useState<MaskCell[]>(() => new Array(fieldSize * fieldSize).fill(MaskCell.hidden));

  const openCell = (x: number, y: number) => {
    if (!isLose || !isWin || mask[y * fieldSize + x] !== MaskCell.show) {
      setMask([
        ...mask.map((item, index) => {
          if (index === y * fieldSize + x) {
            return MaskCell.show;
          }
          return item;
        }),
      ]);
    }
  };

  const changeClosedCell = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, x: number, y: number) => {
    console.log('!');
    e.preventDefault();
    e.stopPropagation();

    let newMask: MaskCell;

    if (!isWin || !isLose || mask[y * fieldSize + x] !== MaskCell.show) {
      if (mask[y * fieldSize + x] === MaskCell.hidden) {
        newMask = MaskCell.flag;
      } else if (mask[y * fieldSize + x] === MaskCell.flag) {
        newMask = MaskCell.question;
      } else if (mask[y * fieldSize + x] === MaskCell.question) {
        newMask = MaskCell.hidden;
      }

      setMask([
        ...mask.map((item, index) => {
          if (index === y * fieldSize + x) {
            return newMask;
          }
          return item;
        }),
      ]);
    }
  };

  return (
    <Box border="5px solid #939393">
      {dimension.map((itemY, y) => (
        <Flex flexWrap="wrap" key={uuidv4()} style={{ display: 'flex' }}>
          {dimension.map((itemX, x) => (
            <Button
              cursor="pointer"
              display="flex"
              transition="all 0.5s ease"
              justifyContent="center"
              alignItems="center"
              key={uuidv4()}
              backgroundImage={sprite}
              backgroundRepeat="no-repeat"
              backgroundPosition={MaskCellType[mask[y * fieldSize + x]]}
              outline="none"
              border="none"
              height="17px"
              width="17px"
              onClick={() => openCell(x, y)}
              onContextMenu={(e) => changeClosedCell(e, x, y)}
            >
              {mask[y * fieldSize + x] === MaskCell.show && field[y * fieldSize + x] === -1 ? '💣' : ''}
              {mask[y * fieldSize + x] === MaskCell.show && field[y * fieldSize + x] !== -1
                ? field[y * fieldSize + x]
                : ''}
            </Button>
          ))}
        </Flex>
      ))}
    </Box>
  );
}

export default Field;
