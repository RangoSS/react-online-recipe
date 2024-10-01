import React, { useState } from 'react';
import axios from 'axios';

const AddRecipe = ({ onRecipeAdded }) => {
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    category: '',
    prepTime: '',
    cookTime: '',
    servings: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/recipes', recipe);
      alert('Recipe added successfully!');
      onRecipeAdded(); // Callback to refresh the recipe list
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  return (
    <div className="container mt-3">
      <h2>Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Recipe Name</label>
          <input type="text" name="name" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Ingredients</label>
          <textarea name="ingredients" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Instructions</label>
          <textarea name="instructions" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Category</label>
          <select name="category" className="form-control" onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Dessert">Dessert</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Preparation Time (minutes)</label>
          <input type="number" name="prepTime" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Cooking Time (minutes)</label>
          <input type="number" name="cookTime" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Servings</label>
          <input type="number" name="servings" className="form-control" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipe;
