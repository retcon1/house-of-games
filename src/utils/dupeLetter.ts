export const dupeLetter = (str: string, letter: string): boolean => {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === letter) {
      count++;
    }
  }
  return count === 1 ? false : true;
};
