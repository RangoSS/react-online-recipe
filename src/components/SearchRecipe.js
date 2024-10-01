import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('');

  const fetchRecipes = async () => {
    const query = searchCategory
      ? `http://localhost:5000/recipes?category=${searchCategory}`
      : `http://localhost:5000/recipes?name_like=${searchTerm}`;
    try {
      const response = await axios.get(query);
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [searchTerm, searchCategory]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select onChange={(e) => setSearchCategory(e.target.value)}>
        <option value="">Select Category</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
      </select>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>{recipe.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchRecipe;
