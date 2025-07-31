import React from "react";
import { NavLink } from "react-router-dom";
import "./Card.css";

// Shape of a single movie
export interface MovieType {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  [key: string]: string; 
}

interface CardProps {
  curMovie: MovieType;
}

export const Card: React.FC<CardProps> = ({ curMovie }) => {
  const { Poster,Title,Year, imdbID } = curMovie;

  return (
    <li className="card-wrapper">
      <div className="card-box">
        <div className="card-image">
          <img src={Poster} alt={imdbID} />
        </div>
        <div className="card-actions">
          <p>{Title}</p>
          <p>{Year}</p>
          <NavLink to={`/movie/${imdbID}`}>
            <button>Watch now</button>
          </NavLink>
        </div>
      </div>
    </li>
  );
};
