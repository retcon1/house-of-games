import axios, { AxiosResponse } from "axios";

const dictionaryAPI = axios.create({
  baseURL: "https://api.dictionaryapi.dev/api/v2/entries/en/",
});

export const lookupWord = async (word: string) => {
  try {
    const response: AxiosResponse = await dictionaryAPI.get(`${word}`);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      console.error("Word not found:", word);
      
      // returns false to stop the process if word isn't found
      return false;
    } else {
      // handles other errors or rethrows them if needed
      throw error;
    }
  }
};
