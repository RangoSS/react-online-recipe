import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateRecipe = ({ selectedRecipe, onUpdateComplete }) => {
  const [recipe, setRecipe] = useState(selectedRecipe);

  useEffect(() => {
    setRecipe(selectedRecipe);
  }, [selectedRecipe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/recipes/${recipe.id}`, recipe);
      alert('Recipe updated successfully!');
      onUpdateComplete();
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  return (
    <div className="container mt-3">
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Recipe Name</label>
          <input type="text" name="name" className="form-control" value={recipe.name} onChange={handleChange} required />
        </div>
        {/* Repeat similar fields for other attributes */}
        <button type="submit" className="btn btn-primary">Update Recipe</button>
      </form>
    </div>
  );
};

export default UpdateRecipe;
