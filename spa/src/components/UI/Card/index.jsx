import React from 'react';
import './card.css';

function Card({ title, overview, popularity, posterPath, onClick }) {
    return (
        <div className="movie-card" onClick={onClick} style={{ cursor: 'pointer' }}>
            <h3 className="movie-title">{title}</h3>
            <p className="movie-overview">{overview.length > 100 ? overview.substring(0, 100) + '...' : overview}</p>
            <div className="movie-popularity">Popularidade: {popularity.toFixed(2)}</div>
        </div>
    );
}

export default Card;
