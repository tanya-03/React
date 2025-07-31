import { NavLink, useLoaderData } from "react-router-dom";
import "./Card.css";
import React from "react";

interface MovieData {
  Poster: string;
  Title: string;
  Runtime: string;
  Type: string;
  Year: string;
  Plot: string;
  Released: string;
  imdbRating: string;
  Country: string;
}

export const ProductPageDetails: React.FC = () => {
  const movieData = useLoaderData() as MovieData;
  console.log(movieData);

  const {
    Poster,
    Title,
    Runtime,
    Type,
    Year,
    Plot,
    Released,
    Country,
    imdbRating,
  } = movieData;

  const totalMinutes = parseInt(Runtime.replace("min", ""));
  if (isNaN(totalMinutes)) {
    return <div>Error: Invalid runtime data.</div>;
  }
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const formattedTime = `${hours}hr ${minutes}min`;

  return (
    <li className="details-list-item">
      <div className="details-container">
        <div className="details-image-container">
          <img src={Poster} alt={Title} className="details-image" />
        </div>
        <div className="details-content">
          <div className="details-title-section">
            <h1 className="details-title">{Title}</h1>
            <div className="details-tag">{`#${Type}`}</div>
            <div className="details-year">Year: {Year}</div>
          </div>
          <p className="details-plot">{Plot}</p>
          <br />
          <p className="details-country">Country: {Country}</p>
          <div className="details-info-section">
            <p className="details-rating">Rating: {imdbRating}</p>
            <p className="details-runtime">{formattedTime}</p>
            <p className="details-release-date">Released: {Released}</p>
          </div>
          <div className="details-go-back-link">
            <NavLink to="/movie">Go Back</NavLink>
          </div>
        </div>
      </div>
    </li>
  );
};