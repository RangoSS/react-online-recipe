import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecipeList = ({ onEdit, onDelete }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/recipes');
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <div className="container mt-3">
      <h2>Recipe List</h2>
      <ul className="list-group">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="list-group-item">
            <h3>{recipe.name}</h3>
            <p>Category: {recipe.category}</p>
            <p>Preparation Time: {recipe.prepTime} mins | Cooking Time: {recipe.cookTime} mins</p>
            <p>Servings: {recipe.servings}</p>
            <button className="btn btn-warning" onClick={() => onEdit(recipe)}>Edit</button>
            <button className="btn btn-danger" onClick={() => onDelete(recipe.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
