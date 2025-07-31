import React, { useState, useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import "./ProductPage.css";
import { Card } from "./Card";

interface MovieType {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  [key: string]: string;
}

interface LoaderData {
  Search: MovieType[];
  Response?: string;
  Error?: string;
  apiError?: boolean;
}

export const Movie: React.FC = () => {
  const moviesData = useLoaderData() as LoaderData;

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">("");

  const hasApiError = moviesData?.apiError;
  const errorMessage = moviesData?.Error;

  const filteredMovies = useMemo(() => {
    if (hasApiError) return [];
    
    let movies = [...(moviesData?.Search || [])];

    if (searchQuery.trim()) {
      movies = movies.filter((movie) =>
        movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortOrder) {
      movies.sort((a, b) => {
        const yearA = parseInt(a.Year);
        const yearB = parseInt(b.Year);

        return sortOrder === "asc" ? yearA - yearB : yearB - yearA;
      });
    }

    return movies;
  }, [moviesData, searchQuery, sortOrder, hasApiError]);

  if (hasApiError) {
    return (
      <div>
        <div className="controls">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-box"
            disabled 
          />

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc" | "")}
            className="sort-dropdown"
            disabled 
          >
            <option value="">Sort by Year</option>
            <option value="asc">Oldest → Newest</option>
            <option value="desc">Newest → Oldest</option>
          </select>
        </div>

        <div className="error-container">
          <div className="error-message">
            <h2>Service Unavailable</h2>
            <p>{errorMessage}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="controls">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-box"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc" | "")}
          className="sort-dropdown"
        >
          <option value="">Sort by Year</option>
          <option value="asc">Oldest → Newest</option>
          <option value="desc">Newest → Oldest</option>
        </select>
      </div>

      {/* Movies List  */}
      <ul className="card-grid">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((curMovie) => (
            <Card key={curMovie.imdbID} curMovie={curMovie} />
          ))
        ) : (
          <p className="no-results">No movies found!</p>
        )}
      </ul>
    </div>
  );
};