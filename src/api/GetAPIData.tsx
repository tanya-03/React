import axios from "axios";

const api = axios.create({
  baseURL: "http://www.omdbapi.com/fhyh",
});

export const getMoviesData = async () => {
  try {
    const response = await api.get(
      `?i=tt3896198&apikey=${import.meta.env.VITE_API_KEY}&s=titanic&page=1`
    );
    const data = response.data;
    console.log('data -->> ', data);
    return data;
  } catch (error) {
    console.error("Error fetching movie data:", error); 
    return {
      Error: "API is currently unavailable. Please try again later.",
      apiError: true 
    };
  }
};