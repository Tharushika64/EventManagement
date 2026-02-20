import { useState } from 'react';
import '../styles/categoryFilter.css';

export default function CategoryFilter({ selectedCategory, onCategoryChange }) {
  const categories = ['All', 'Workshop', 'Tech', 'Concert'];

  return (
    <div className="category-filter">
      <h3>Filter by Category:</h3>
      <div className="filter-buttons">
        {categories.map(category => (
          <button
            key={category}
            className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
