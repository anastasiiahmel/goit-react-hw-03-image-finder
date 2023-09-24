import axios from 'axios';

const API_KEY = '38715052-64f33d15b6d1089a39ac295f6';
const BASE_URL = 'https://pixabay.com/api/';

export const dataQuery = async (searchQuery, page, perPage) => {
  const url = BASE_URL;
  const params = {
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: perPage,
  };

  const response = await axios.get(url, { params });
  return response.data;
};
