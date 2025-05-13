import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Replace with production URL

export const detectText = async (inputText) => {
  const response = await axios.post(`${BASE_URL}/detect`, { text: inputText });
  return response.data;
};
