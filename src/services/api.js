import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';

axios.defaults.params = {
  key: '14533068-e9af747050eb836d452918885',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const fetchImages = async (query, page) => {
  const response = await axios.get(`?q=${query}&page=${page}`);
  return response.data;
};