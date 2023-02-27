import { useState, useEffect } from 'react';
import { Flex, Box, Button } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import sprite from '/minesweeper-sprites.png';
import useCreateField from '../../hooks/useCreateField';

enum MaskCell {
  hidden,
  show,
  flag,
  question,
  bomb,
  explosion,
}

const MaskCellType = {
  [MaskCell.hidden]: '0px -50px',
  [MaskCell.show]: '-17px -50px',
  [MaskCell.flag]: '-34px -50px',
  [MaskCell.question]: '-51px -50px',
  [MaskCell.bomb]: '-85px -50px',
  [MaskCell.explosion]: '-102px -50px',
};

function Field() {
  const fieldSize = 16;
  const dimension = new Array(fieldSize).fill(null);

  const [field, setField] = useState<number[]>(() => useCreateField(fieldSize));
  const [mask, setMask] = useState<MaskCell[]>(() => new Array(fieldSize * fieldSize).fill(MaskCell.hidden));

  const [emotiIcon, setEmotiIcon] = useState('0px -25px');

  const [isLose, setIsLose] = useState(false);
  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
    const numberCells = field.filter((el) => el !== -1);
    const openCells = mask.filter((el) => el === 1);

    if (numberCells.every((el, i) => openCells[i] === MaskCell.show)) {
      setIsWin(true);
    }
  }, [field, mask]);

  const openCell = (x: number, y: number) => {
    const clearing: [number, number][] = [];
    const newMaskState = JSON.parse(JSON.stringify(mask));

    function clear(xCoord: number, yCoord: number) {
      if (xCoord >= 0 && xCoord < fieldSize && yCoord >= 0 && yCoord < fieldSize) {
        if (newMaskState[yCoord * fieldSize + xCoord] !== MaskCell.show) {
          clearing.push([xCoord, yCoord]);
        }
      }
    }

    if (!isLose && !isWin && mask[y * fieldSize + x] !== 1) {
      if (field[y * fieldSize + x] !== -1) {
        clear(x, y);

        while (clearing.length) {
          const [xCoord, yCoord] = clearing.pop()!;

          newMaskState[yCoord * fieldSize + xCoord] = MaskCell.show;

          if (field[yCoord * fieldSize + xCoord] === 0) {
            clear(xCoord + 1, yCoord);
            clear(xCoord - 1, yCoord);
            clear(xCoord, yCoord + 1);
            clear(xCoord, yCoord - 1);
          }
        }

        setMask(newMaskState);
      } else {
        setMask([
          ...mask.map((item, index) => {
            if (index === y * fieldSize + x) {
              return MaskCell.explosion;
            }
            if (field[index] === -1) {
              return MaskCell.bomb;
            }
            return MaskCell.show;
          }),
        ]);

        setIsLose(true);
      }
    }
  };

  const changeClosedCell = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, x: number, y: number) => {
    e.preventDefault();
    e.stopPropagation();

    let newMask: MaskCell;

    if (!isLose && !isWin && mask[y * fieldSize + x] !== 1) {
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

  const resetGame = () => {
    setIsLose(false);
    setIsWin(false);
    setField(useCreateField(fieldSize));
    setMask(new Array(fieldSize * fieldSize).fill(MaskCell.hidden));
    setEmotiIcon('0px -25px');
  };

  useEffect(() => {
    if (isWin) {
      setEmotiIcon('-81px -25px');
    }
  }, [isWin]);

  useEffect(() => {
    if (isLose) {
      setEmotiIcon('-108px -25px');
    }
  }, [isWin]);

  return (
    <Box>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        p="5px 10px"
        w="252px"
        border="5px solid #939393"
        backgroundColor="#BDBDBD"
      >
        <div>40</div>
        <Button
          cursor="pointer"
          display="flex"
          justifyContent="center"
          alignItems="center"
          backgroundImage={sprite}
          backgroundRepeat="no-repeat"
          backgroundPosition={emotiIcon}
          outline="none"
          border="none"
          height="25px"
          width="26px"
          onMouseDown={() => setEmotiIcon('-28px -25px')}
          onClick={resetGame}
        />
        <div>00</div>
      </Flex>
      <Box border="5px solid #939393" transition="all 0.5s ease">
        {dimension.map((itemY, y) => (
          <Flex flexWrap="wrap" key={uuidv4()} style={{ display: 'flex' }} transition="all 0.5s ease">
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
                onContextMenu={(e) => changeClosedCell(e, x, y)}
                onMouseDown={(e) => {
                  if (e.button === 0 && !isLose && !isLose) {
                    setEmotiIcon('-54px -25px');
                  }
                }}
                onMouseUp={(e) => {
                  if (!isLose && !isLose) {
                    setEmotiIcon('0px -25px');
                    openCell(x, y);
                  }
                }}
              >
                {mask[y * fieldSize + x] === MaskCell.show &&
                field[y * fieldSize + x] !== -1 &&
                field[y * fieldSize + x] !== 0
                  ? field[y * fieldSize + x]
                  : ''}
              </Button>
            ))}
          </Flex>
        ))}
      </Box>
    </Box>
  );
}

export default Field;
