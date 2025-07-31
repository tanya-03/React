import { useNavigate } from "react-router-dom";
import React from 'react'; 

interface Styles {
  [key: string]: React.CSSProperties;
}

export const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    console.log("navigate : ", navigate);
    navigate(-1); 
  };

  return (
    <div style={styles.body}>
      <div className="c" style={styles.container}>
        <div className="_404" style={styles._404}>
          404
        </div>
        <hr style={styles.hr} />
        <div className="_1" style={styles._1}>
          THE PAGE
        </div>
        <div className="_2" style={styles._2}>
          WAS NOT FOUND
        </div>

        <button className="btn" style={styles.btn} onClick={handleGoBack}>
          Go BACK
        </button>
      </div>
    </div>
  );
};

const styles: Styles = {
  body: {
    background: "#842d06",
    color: "#fff",
    fontFamily: "'Open Sans', sans-serif",
    overflow: "hidden",
    position: "relative",
    height: "100vh",
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  container: {
    textAlign: "center",
    position: "relative",
    width: "80%",
    maxWidth: '600px', 
    margin: "0 auto", 
    padding: '20px',
  },
  _404: {
    fontSize: "220px",
    letterSpacing: "15px",
    zIndex: 2,
    lineHeight: '1', 
  },
  _1: {
    letterSpacing: "12px",
    fontSize: "4em",
    lineHeight: "80%",
    margin: "20px 0",
  },
  _2: {
    fontSize: "20px",
  },
  btn: {
    backgroundColor: "#fff",
    color: "#842d06",
    textDecoration: "none",
    fontSize: "25px",
    padding: "10px 20px", 
    width: "auto", 
    display: "inline-block",
    marginTop: "40px", 
    borderRadius: '8px', 
    border: 'none', 
    cursor: 'pointer', 
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
    transition: 'background-color 0.3s ease', 
  },
  hr: {
    border: "none",
    borderTop: "5px solid #fff",
    width: "420px",
    height: "10px",
    margin: "0 auto",
    position: "relative",
  },
};