import wordBank from "./word-bank.txt";

export const generateWordSet = async () => {
  const response = await fetch(wordBank);
  const rawText = await response.text();
  const wordArr = rawText.split("\n");
  const todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
  const wordSet = new Set(wordArr);
  return { wordSet, todaysWord };
};
