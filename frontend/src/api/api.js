import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; 
// Later change this to your actual backend server URL!

export const detectText = async (inputText) => {
  try {
    const response = await axios.post(`${BASE_URL}/detect`, {
      text: inputText,
    });
    return response.data;
  } catch (error) {
    console.error('Error detecting text:', error);
    throw error;
  }
};
