import type { LoaderFunctionArgs } from "react-router-dom";
import axios from "axios";

const api = axios.create({
  baseURL: "http://www.omdbapi.com/",
});

export const getMovieDetails = async ({ params }: LoaderFunctionArgs) => {
  const id = params.movieID;

  try {
    const response = await api.get(
      `?i=${id}&apikey=${import.meta.env.VITE_API_KEY}`
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw new Error("Failed to fetch movie details. Please try again later.");
  }
};