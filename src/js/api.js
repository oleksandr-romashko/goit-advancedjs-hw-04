const PIXABAY_API_KEY = '40405988-c6d5b0647c8f4a8e4e473288b';
import axios from 'axios';

export async function fetchImages(query, pageNumber) {
  const response = await axios.get(
    `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}&per_page=40`
  );
  return response.data;
}