// apiService.js
import axios from "axios";

const apiService = axios.create({
  baseURL: "https://www.omdbapi.com",
});

const getMovies = async () => {
  try {
    const response = await apiService.get(`?apikey=85c49da1&s=The A`);
    return response.data.Search;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

const getMovieById = async (id) => {
  try {
    const response = await apiService.get(`?apikey=85c49da1&i=${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export { getMovies, getMovieById };
