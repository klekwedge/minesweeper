/* eslint-disable import/no-absolute-path */
import { useState, useEffect, useRef } from 'react';
import { Flex, Box, Button, Image, Text } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import sprite from '/minesweeper-sprites.png';
import useCreateField from '../../hooks/useCreateField';
import { FirstIndexType, MaskCell, MaskCellType, numbers, timer } from '../../types/types';

function Field() {
  const fieldSize = 16;
  const dimension = new Array(fieldSize).fill(null);

  const [field, setField] = useState<number[]>([]);
  const [mask, setMask] = useState<MaskCell[]>(() => new Array(fieldSize * fieldSize).fill(MaskCell.hidden));

  const [emotiIcon, setEmotiIcon] = useState('0px -25px');
  const [minutesIcon, setMinutesIcon] = useState<string[]>(['-42px 0px', '-126px 0px']);
  const [secondsIcon, setSecondsIcon] = useState<string[]>(['-126px 0px', '-126px 0px']);

  const [isLose, setIsLose] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [isFirstMove, setIsFirstMove] = useState(true);
  const [firstIndex, setFirstIndex] = useState<FirstIndexType>();

  const timerId = useRef<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(2400);

  const clearTimerId = () => {
    if (timerId.current) {
      clearInterval(timerId.current);
    }
    timerId.current = null;
  };

  function showAllCells() {
    setMask([
      ...mask.map((item, index) => {
        if (field[index] === -1) {
          return MaskCell.bomb;
        }
        return MaskCell.show;
      }),
    ]);
    clearTimerId();
  }

  useEffect(() => {
    if (timeLeft >= 0) {
      const minutes = Math.floor(timeLeft / 60);
      const newTimerMinutes = [timer[Math.floor(minutes / 10)], timer[minutes % 10]];
      setMinutesIcon(newTimerMinutes);

      const seconds = timeLeft % 60;
      const newTimerSeconds = [timer[Math.floor(seconds / 10)], timer[seconds % 10]];
      setSecondsIcon(newTimerSeconds);
    } else {
      if (!isWin) {
        setEmotiIcon('-108px -25px');
      }
      showAllCells();
    }
  }, [timeLeft]);

  useEffect(() => {
    const numberCells = field.filter((el) => el !== -1);
    const openCells = mask.filter((el) => el === 1);

    if (
      !isFirstMove &&
      !isWin &&
      !isLose &&
      timeLeft >= 0 &&
      numberCells.every((el, i) => openCells[i] === MaskCell.show)
    ) {
      setIsWin(true);
      showAllCells();
      setEmotiIcon('-81px -25px');
    }
  }, [field, mask]);

  const openCell = (x: number, y: number) => {
    const clearingCells: [number, number][] = [];
    const newMaskState = JSON.parse(JSON.stringify(mask));

    if (isFirstMove) {
      const firstCell = y * fieldSize + x;
      setField(useCreateField(firstCell, fieldSize));
      setIsFirstMove(false);
      setFirstIndex({ x, y });
    }

    function clearCells(xCoord: number, yCoord: number) {
      if (xCoord >= 0 && xCoord < fieldSize && yCoord >= 0 && yCoord < fieldSize) {
        if (newMaskState[yCoord * fieldSize + xCoord] !== MaskCell.show) {
          clearingCells.push([xCoord, yCoord]);
        }
      }
    }

    if (!isFirstMove && !isLose && !isWin && mask[y * fieldSize + x] !== 1) {
      if (field[y * fieldSize + x] !== -1) {
        clearCells(x, y);

        while (clearingCells.length) {
          const [xCoord, yCoord] = clearingCells.pop()!;
          newMaskState[yCoord * fieldSize + xCoord] = MaskCell.show;

          if (field[yCoord * fieldSize + xCoord] === 0) {
            clearCells(xCoord + 1, yCoord);
            clearCells(xCoord - 1, yCoord);
            clearCells(xCoord, yCoord + 1);
            clearCells(xCoord, yCoord - 1);
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
        setEmotiIcon('-108px -25px');
        clearTimerId();
      }
    }
  };

  useEffect(() => {
    if (!isFirstMove && firstIndex) {
      openCell(firstIndex.x, firstIndex.y);
      timerId.current = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    }
  }, [firstIndex]);

  const changeClosedCell = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, x: number, y: number) => {
    e.preventDefault();
    e.stopPropagation();

    let newMask: MaskCell;

    if (timeLeft >= 0 && !isLose && !isWin && mask[y * fieldSize + x] !== 1) {
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
    clearTimerId();
    setTimeLeft(2400);
    setIsLose(false);
    setIsWin(false);
    setField([]);
    setFirstIndex(undefined);
    setIsFirstMove(true);
    setMask(new Array(fieldSize * fieldSize).fill(MaskCell.hidden));
    setEmotiIcon('0px -25px');
  };

  return (
    <Box>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        p="5px 10px"
        w="282px"
        border="5px solid #939393"
        backgroundColor="#BDBDBD"
      >
        <Flex>
          {minutesIcon.map((pos) => (
            <Image
              key={uuidv4()}
              display="flex"
              justifyContent="center"
              alignItems="center"
              backgroundImage={sprite}
              backgroundRepeat="no-repeat"
              backgroundPosition={pos}
              height="25px"
              width="13px"
            />
          ))}
        </Flex>
        <Button
          cursor="pointer"
          display="flex"
          justifyContent="center"
          alignItems="center"
          backgroundImage={sprite}
          backgroundRepeat="no-repeat"
          backgroundPosition={emotiIcon}
          height="25px"
          width="26px"
          onMouseDown={() => setEmotiIcon('-28px -25px')}
          onClick={resetGame}
        />
        <Flex>
          {secondsIcon.map((pos) => (
            <Image
              key={uuidv4()}
              display="flex"
              justifyContent="center"
              alignItems="center"
              backgroundImage={sprite}
              backgroundRepeat="no-repeat"
              backgroundPosition={pos}
              height="25px"
              width="13px"
            />
          ))}
        </Flex>
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
                height="17px"
                width="17px"
                onContextMenu={(e) => changeClosedCell(e, x, y)}
                onMouseDown={(e) => {
                  if (mask[y * fieldSize + x] !== 1 && e.button === 0 && !isLose && !isWin && timeLeft >= 0) {
                    setEmotiIcon('-54px -25px');
                  }
                }}
                onMouseUp={(e) => {
                  if (e.button === 0 && !isLose && !isWin && timeLeft >= 0) {
                    setEmotiIcon('0px -25px');
                    openCell(x, y);
                  }
                }}
              >
                {mask[y * fieldSize + x] === MaskCell.show &&
                field[y * fieldSize + x] !== -1 &&
                field[y * fieldSize + x] !== 0 ? (
                  <Text
                    as="span"
                    height="17px"
                    width="17px"
                    backgroundImage={sprite}
                    backgroundRepeat="no-repeat"
                    backgroundPosition={numbers[field[y * fieldSize + x] - 1]}
                  />
                ) : (
                  ''
                )}
              </Button>
            ))}
          </Flex>
        ))}
      </Box>
    </Box>
  );
}

export default Field;
