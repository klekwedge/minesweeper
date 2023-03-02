function useCreateField(firstIndex: number, fieldSize: number): number[] {
  const field: number[] = new Array(fieldSize * fieldSize).fill(0);

  function increaseCellCounter(x: number, y: number) {
    if (x >= 0 && x < fieldSize && y >= 0 && y < fieldSize) {
      if (field[y * fieldSize + x] === -1) return;

      field[y * fieldSize + x] += 1;
    }
  }

  for (let i = 0; i < fieldSize; ) {
    const x = Math.floor(Math.random() * fieldSize);
    const y = Math.floor(Math.random() * fieldSize);

    if (field[y * fieldSize + x] !== -1 && y * fieldSize + x !== firstIndex) {
      field[y * fieldSize + x] = -1;

      i += 1;

      increaseCellCounter(x + 1, y);
      increaseCellCounter(x - 1, y);
      increaseCellCounter(x, y + 1);
      increaseCellCounter(x, y - 1);
      increaseCellCounter(x + 1, y - 1);
      increaseCellCounter(x - 1, y - 1);
      increaseCellCounter(x + 1, y + 1);
      increaseCellCounter(x - 1, y + 1);
    }
  }

  return field;
}

export default useCreateField;
