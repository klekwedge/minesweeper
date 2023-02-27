function useTimer(num: number): string {
  switch (num) {
    case 0:
      return '-126px 0px';
    case 1:
      return '-1px 0px';
    case 2:
      return '-14px 0px';
    case 3:
      return '-28px 0px';
    case 4:
      return '-42px 0px';
    case 5:
      return '-56px 0px';
    case 6:
      return '-70px 0px';
    case 7:
      return '-85px 0px';
    case 8:
      return '-98px 0px';
    case 9:
      return '-112px 0px';
    default:
      return '-126px 0px';
  }
}

export default useTimer;
